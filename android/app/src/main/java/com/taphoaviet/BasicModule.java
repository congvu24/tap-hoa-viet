package com.taphoaviet;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BasicModule extends ReactContextBaseJavaModule {

    public BasicModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "Basic Module";
    }

    @ReactMethod
    public void nextActivity(String messages){
        Intent intent = new Intent(getReactApplicationContext(), ClassifierActivity.class);
        getReactApplicationContext().startActivity(intent);
    }
}