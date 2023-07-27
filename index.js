import { NativeModules } from "react-native";
export var CredentialState;
(function (CredentialState) {
    CredentialState["CREATED"] = "CREATED";
    CredentialState["PENDING"] = "PENDING";
    CredentialState["OFFERED"] = "OFFERED";
    CredentialState["ACCEPTED"] = "ACCEPTED";
    CredentialState["REJECTED"] = "REJECTED";
    CredentialState["REVOKED"] = "REVOKED";
    CredentialState["ERROR"] = "ERROR";
})(CredentialState || (CredentialState = {}));
export var RevocationMethod;
(function (RevocationMethod) {
    RevocationMethod["NONE"] = "NONE";
    RevocationMethod["STATUS_LIST2021"] = "STATUS_LIST2021";
    RevocationMethod["LVVC"] = "LVVC";
})(RevocationMethod || (RevocationMethod = {}));
export var CredentialFormat;
(function (CredentialFormat) {
    CredentialFormat["JWT"] = "JWT";
    CredentialFormat["SD_JWT"] = "SD_JWT";
    CredentialFormat["JSON_LD"] = "JSON_LD";
    CredentialFormat["MDOC"] = "MDOC";
})(CredentialFormat || (CredentialFormat = {}));
export var ClaimDataType;
(function (ClaimDataType) {
    ClaimDataType["STRING"] = "STRING";
    ClaimDataType["DATE"] = "DATE";
    ClaimDataType["NUMBER"] = "NUMBER";
})(ClaimDataType || (ClaimDataType = {}));
const rnONE = NativeModules.ProcivisOneCoreModule;
export default rnONE;
