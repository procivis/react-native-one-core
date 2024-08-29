package ch.procivis.one.core

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import kotlin.reflect.KClass
import kotlin.reflect.KParameter
import kotlin.reflect.KType

object Deserialize {
    inline fun <reified T> construct(data: ReadableMap): T {
        return constructObjectWithMembers(T::class, data) as T
    }

    private fun extractArrayItem(kType: KType, data: ReadableArray, index: Int): Any {
        val kClass = kType.classifier as KClass<*>

        if (kClass.java.isEnum) {
            return constructEnumValue(kClass, data.getString(index))
        }

        return when (kClass) {
            Boolean::class -> data.getBoolean(index)
            String::class -> data.getString(index)
            UInt::class -> data.getInt(index).toUInt()
            Long::class -> data.getInt(index).toLong()
            List::class -> {
                val itemType = kType.arguments.first().type
                val values = data.getArray(index)
                return extractArrayItems(itemType!!, values)
            }

            Map::class -> {
                val values = data.getMap(index)
                return extractMapItems(kType, values)
            }

            else -> constructObjectWithMembers(kClass, data.getMap(index))
        }
    }

    private fun extractArrayItems(type: KType, data: ReadableArray): List<Any?> {
        val result = mutableListOf<Any?>()
        for (i in 0 until data.size()) {
            result.add(extractArrayItem(type, data, i))
        }
        return result
    }

    private fun extractMapItems(type: KType, data: ReadableMap): Map<String, Any?> {
        val valueType = type.arguments[1].type
        val iterator = data.keySetIterator()
        val result = mutableMapOf<String, Any?>()
        while (iterator.hasNextKey()) {
            val key = iterator.nextKey()
            result[key] = extractObjectItem(valueType!!, data, key)
        }
        return result
    }

    private fun extractObjectItem(type: KType, data: ReadableMap, name: String): Any? {
        if (!data.hasKey(name)) {
            return null
        }

        val kClass = type.classifier as KClass<*>

        // exceptional types
        if (DeserializeSpecific.Obj.isCustomConversionType(kClass)) {
            return DeserializeSpecific.Obj.convertCustom(kClass, data, name)
        }

        if (kClass.java.isEnum) {
            return constructEnumValue(kClass, data.getString(name)!!)
        }

        return when (kClass) {
            Boolean::class -> data.getBoolean(name)
            String::class -> data.getString(name)
            UInt::class -> data.getInt(name).toUInt()
            Long::class -> data.getInt(name).toLong()
            List::class -> {
                val values = data.getArray(name)!!
                val itemType = type.arguments.first().type
                return extractArrayItems(itemType!!, values)
            }

            Map::class -> {
                val values = data.getMap(name)!!
                return extractMapItems(type, values)
            }

            else -> {
                val value = data.getMap(name)!!
                return constructObjectWithMembers(kClass, value)
            }
        }
    }

    private fun constructEnumValue(c: KClass<*>, value: String): Any {
        val enumEntry = c.java.enumConstants.firstOrNull { entry ->
            val enumValue = entry as Enum<*>
            enumValue.name == value
        }
        if (enumEntry == null) {
            throw NoSuchElementException("Enum ${c.simpleName} value `$value` invalid")
        }
        return enumEntry
    }

    fun constructObjectWithMembers(c: KClass<*>, data: ReadableMap): Any {
        val constructor = c.constructors.first()
        val constructorParams = mutableMapOf<KParameter, Any?>()
        constructor.parameters.forEach { parameter ->
            constructorParams[parameter] = extractObjectItem(parameter.type, data, parameter.name!!)
        }
        return constructor.callBy(constructorParams)
    }
}