package ch.procivis.one.core

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableArray
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper

object Util {
    // error handling
    fun <T> asyncCall(promise: Promise, function: () -> T) {
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
    fun <T> convertObjectDataClass(input: T): ReadableMap {
        return convertJsonObjectNode(convertDataClassToJson(input))
    }

    fun <T> convertArrayDataClass(input: Collection<T>): ReadableArray {
        return convertJsonArrayNode(convertDataClassToJson(input))
    }

    private fun <T> convertDataClassToJson(input: T): JsonNode {
        val mapper = ObjectMapper()
        val json = mapper.writeValueAsString(input)
        return mapper.readTree(json)
    }

    private fun convertJsonObjectNode(input: JsonNode): ReadableMap {
        if (!input.isObject) {
            throw Exception("Not an object node")
        }

        val result = Arguments.createMap()
        input.fields().forEach { field ->
            val key = field.key
            val value = field.value

            if (value.isArray) {
                result.putArray(key, convertJsonArrayNode(value))
            } else if (value.isObject) {
                result.putMap(key, convertJsonObjectNode(value))
            } else if (value.isNull) {
                result.putNull(key)
            } else if (value.isBoolean) {
                result.putBoolean(key, value.asBoolean())
            } else if (value.isIntegralNumber && value.canConvertToInt()) {
                result.putInt(key, value.asInt())
            } else if (value.isNumber) {
                result.putDouble(key, value.asDouble())
            } else {
                result.putString(key, value.asText())
            }
        }
        return result
    }

    private fun convertJsonArrayNode(input: JsonNode): ReadableArray {
        if (!input.isArray) {
            throw Exception("Not an array node")
        }

        val result = Arguments.createArray()
        val size = input.size()
        for (n in 0 until size) {
            val item = input.get(n)

            if (item.isArray) {
                result.pushArray(convertJsonArrayNode(item))
            } else if (item.isObject) {
                result.pushMap(convertJsonObjectNode(item))
            } else if (item.isNull) {
                result.pushNull()
            } else if (item.isBoolean) {
                result.pushBoolean(item.asBoolean())
            } else if (item.isIntegralNumber && item.canConvertToInt()) {
                result.pushInt(item.asInt())
            } else if (item.isNumber) {
                result.pushDouble(item.asDouble())
            } else {
                result.pushString(item.asText())
            }
        }
        return result
    }
}