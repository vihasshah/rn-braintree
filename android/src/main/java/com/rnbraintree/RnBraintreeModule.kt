package com.rnbraintree

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import com.braintreepayments.api.BraintreeFragment
import com.braintreepayments.api.Card
import com.braintreepayments.api.exceptions.InvalidArgumentException
import com.braintreepayments.api.interfaces.BraintreeErrorListener
import com.braintreepayments.api.interfaces.PaymentMethodNonceCreatedListener
import com.braintreepayments.api.models.CardBuilder
import com.facebook.react.bridge.*


class RnBraintreeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener, LifecycleEventListener {
    private val PAYMENT_REQUEST = 1706816330
    private var clientToken: String? = null
    private var mBraintreeFragment: BraintreeFragment? = null
    private var promise: Promise? = null

    init {
      reactContext.addActivityEventListener(this)
      reactContext.addLifecycleEventListener(this)
    }

    override fun getName(): String {
        return "RnBraintree"
    }

    /*
        globally save clientToken
        this token fetch is not part of this lib
     */
    @ReactMethod
    fun setup(clientToken: String){
        this.clientToken = clientToken
      try {
        mBraintreeFragment = BraintreeFragment.newInstance(currentActivity as AppCompatActivity, clientToken)
        mBraintreeFragment?.addListener(PaymentMethodNonceCreatedListener {
          promise?.resolve(it.nonce)
        })
        mBraintreeFragment?.addListener(BraintreeErrorListener {
          promise?.reject("BRIANTREE_ERROR",it.message)
        })
        // mBraintreeFragment is ready to use!
      } catch (e: InvalidArgumentException) {
        // There was an issue with your authorization string.
      }
    }

    @ReactMethod
    fun getCardNounce(card:ReadableMap, promise: Promise){
      this.promise = promise
      if(mBraintreeFragment == null){
        promise.reject("SETUP_FAILD","Please re-run setup")
      }
      val cardBuilder = CardBuilder().validate(true);
      if(card.hasKey("cardNumber")) {
        cardBuilder.cardNumber(card.getString("cardNumber"))
      }
      if(card.hasKey("cardHolderName")) {
        cardBuilder.cardholderName(card.getString("cardHolderName"))
      }
      if(card.hasKey("expiryMonth")) {
        cardBuilder.expirationMonth(card.getString("expiryMonth"))
      }
      if(card.hasKey("expiryYear")) {
        cardBuilder.expirationYear(card.getString("expiryYear"))
      }
      if(card.hasKey("cardCvv")) {
        cardBuilder.cvv(card.getString("cardCvv"))
      }

      Card.tokenize(mBraintreeFragment,cardBuilder)
    }

    override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {

    }

    override fun onHostResume() {

    }

    override fun onHostPause() {

    }

    override fun onHostDestroy() {
      mBraintreeFragment?.let {
        it.removeListener(PaymentMethodNonceCreatedListener{})
        it.removeListener(BraintreeErrorListener{})
      }
    }

    override fun onNewIntent(intent: Intent?) {
    }


}
