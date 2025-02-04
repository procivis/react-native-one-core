package ch.procivis.one.core.ubiqu

import android.view.View
import ch.procivis.one.core.NativeKeyStorageException
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

class PinPadViewManager(private val callerContext: ReactApplicationContext) :
    SimpleViewManager<View>() {
    companion object {
        const val REACT_CLASS = "RCTProcivisRSEPinPad"
    }

    override fun getName() = REACT_CLASS

    override fun createViewInstance(context: ThemedReactContext): View {
        throw NativeKeyStorageException.Unsupported()
    }
}