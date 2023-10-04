package ch.procivis.one.core

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableMap

object Util {
    // error handling
    fun asyncCall(promise: Promise, function: () -> Any?) {
        try {
            promise.resolve(function())
        } catch (error: Throwable) {
            promise.reject(
                error.javaClass.simpleName.replaceFirst(Regex("Exception$"), "Error"),
                error.message,
                error
            )
        }
    }

    // generic object parsing
    fun convertToRN(input: Any?): Any? {
        val (type, value) = getRNType(input)
        return when (type) {
            RNType.MAP -> value?.let { convertObject(it) }
            RNType.ARRAY -> convertArray(input as Collection<*>)
            else -> throw IllegalArgumentException("Invalid conversion: $input")
        }
    }

    private enum class RNType {
        MAP,
        ARRAY,
        NULL,
        INT,
        DOUBLE,
        BOOLEAN,
        STRING
    }

    private fun getRNType(input: Any?): Pair<RNType, *> {
        if (input == null) {
            return Pair(RNType.NULL, null)
        }

        val type = input!!.javaClass

        if (Collection::class.java.isAssignableFrom(type)) {
            return Pair(RNType.ARRAY, input as Collection<*>)
        } else if (type.isEnum) {
            return Pair(RNType.STRING, (input as Enum<*>).name)
        } else if (type == Boolean::class.java || type == java.lang.Boolean::class.java) {
            return Pair(RNType.BOOLEAN, input as Boolean)
        } else if (type == String::class.java || type == java.lang.String::class.java) {
            return Pair(RNType.STRING, input as String)
        } else if (type == Int::class.java || type == java.lang.Integer::class.java) {
            return Pair(RNType.INT, input as Int)
        } else if (type == Byte::class.java || type == java.lang.Byte::class.java) {
            return Pair(RNType.INT, (input as Byte).toInt())
        } else if (type == Short::class.java || type == java.lang.Short::class.java) {
            return Pair(RNType.INT, (input as Short).toInt())
        } else if (type == Long::class.java || type == java.lang.Long::class.java) {
            return Pair(RNType.DOUBLE, (input as Long).toDouble())
        } else if (type == Float::class.java || type == java.lang.Float::class.java) {
            return Pair(RNType.DOUBLE, (input as Float).toDouble())
        } else if (type == Double::class.java || type == java.lang.Double::class.java) {
            return Pair(RNType.DOUBLE, input as Double)
        } else if (type == Char::class.java || type == java.lang.Character::class.java) {
            return Pair(RNType.STRING, (input as Char).toString())
        } else {
            return Pair(RNType.MAP, input)
        }
    }

    private fun convertObject(input: Any): ReadableMap {
        val result = Arguments.createMap()

        if (input is Map<*, *>) {
            input.forEach { entry ->
                convertObjectItem(result, entry.key.toString(), entry.value)
            }
        } else {
            input.javaClass.declaredFields.forEach { field ->
                field.isAccessible = true
                convertObjectItem(result, field.name, field.get(input))
            }
        }
        return result
    }

    private fun convertObjectItem(map: WritableMap, itemName: String, itemValue: Any?) {
        val (type, value) = getRNType(itemValue)
        when (type) {
            RNType.MAP -> map.putMap(itemName, value?.let { convertObject(it) })
            RNType.ARRAY -> map.putArray(itemName, convertArray(value as Collection<*>))
            RNType.NULL -> map.putNull(itemName)
            RNType.INT -> map.putInt(itemName, value as Int)
            RNType.DOUBLE -> map.putDouble(itemName, value as Double)
            RNType.BOOLEAN -> map.putBoolean(itemName, value as Boolean)
            RNType.STRING -> map.putString(itemName, value as String)
        }
    }

    private fun convertArray(input: Collection<*>): ReadableArray {
        val result = Arguments.createArray()
        input.forEach { item ->
            val (type, value) = getRNType(item)
            when (type) {
                RNType.MAP -> result.pushMap(value?.let { convertObject(it) })
                RNType.ARRAY -> result.pushArray(convertArray(value as Collection<*>))
                RNType.NULL -> result.pushNull()
                RNType.INT -> result.pushInt(value as Int)
                RNType.DOUBLE -> result.pushDouble(value as Double)
                RNType.BOOLEAN -> result.pushBoolean(value as Boolean)
                RNType.STRING -> result.pushString(value as String)
            }
        }
        return result
    }
}