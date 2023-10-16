package ch.procivis.one.core

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import uniffi.one_core.DidRequestBindingDto
import uniffi.one_core.DidRequestKeysBindingDto
import uniffi.one_core.DidTypeBindingEnum
import uniffi.one_core.KeyRequestBindingDto

object Deserialize {
    fun keyRequest(request: ReadableMap): KeyRequestBindingDto {
        val keyType = request.getString("keyType")!!
        val name = request.getString("name")!!
        val storageType = request.getString("storageType")!!
        val organisationId = request.getString("organisationId")!!

        val keyParams = mutableMapOf<String, String>()
        for (entry in request.getMap("keyParams")!!.entryIterator) {
            keyParams[entry.key] = entry.value as String
        }

        val storageParams = mutableMapOf<String, String>()
        for (entry in request.getMap("storageParams")!!.entryIterator) {
            storageParams[entry.key] = entry.value as String
        }

        return KeyRequestBindingDto(
            organisationId,
            keyType,
            keyParams,
            name,
            storageType,
            storageParams
        )
    }

    fun didRequest(request: ReadableMap): DidRequestBindingDto {
        val organisationId = request.getString("organisationId")!!
        val name = request.getString("name")!!
        val didMethod = request.getString("didMethod")!!
        val didType = didType(request.getString("didType")!!)
        val keys = didRequestKeys(request.getMap("keys")!!)
        return DidRequestBindingDto(organisationId, name, didMethod, didType, keys)
    }

    private fun didType(type: String): DidTypeBindingEnum {
        return when (type.lowercase()) {
            "local" -> DidTypeBindingEnum.LOCAL;
            "remote" -> DidTypeBindingEnum.REMOTE;
            else -> {
                throw IllegalArgumentException("Invalid did type: $type")
            }
        }
    }

    private fun didRequestKeys(requestKeys: ReadableMap): DidRequestKeysBindingDto {
        val authentication = didRequestRoleKeys(requestKeys, "authentication")
        val assertion = didRequestRoleKeys(requestKeys, "assertion")
        val keyAgreement = didRequestRoleKeys(requestKeys, "keyAgreement")
        val capabilityInvocation = didRequestRoleKeys(requestKeys, "capabilityInvocation")
        val capabilityDelegation = didRequestRoleKeys(requestKeys, "capabilityDelegation")
        return DidRequestKeysBindingDto(
            authentication,
            assertion,
            keyAgreement,
            capabilityInvocation,
            capabilityDelegation
        )
    }

    private fun didRequestRoleKeys(requestKeys: ReadableMap, role: String): List<String> {
        val roleKeys = requestKeys.getArray(role)!!
        val result = mutableListOf<String>()
        for (n in 0 until roleKeys.size()) {
            result.add(roleKeys.getString(n))
        }
        return result
    }
}