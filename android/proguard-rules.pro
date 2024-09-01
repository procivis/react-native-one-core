-keep class java.security.*
-keep class kotlin.UInt { *; }
-keep class ch.procivis.one.core.** { *; }

# java-native-access
-dontwarn java.awt.*
-keep class com.sun.jna.* { *; }
-keep class * extends com.sun.jna.* { public *; }
