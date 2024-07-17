package com.v2stech.exif;


import android.media.ExifInterface;
import android.net.Uri;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.*;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import com.v2stech.exif.utils.PathUtil;

@RequiresApi(api = Build.VERSION_CODES.N)
public class Exif extends ReactContextBaseJavaModule {
    private static final String[] EXIF_ATTRIBUTES = new String[] {
            ExifInterface.TAG_APERTURE,
            ExifInterface.TAG_DATETIME,
            ExifInterface.TAG_DATETIME_DIGITIZED,
            ExifInterface.TAG_EXPOSURE_TIME,
            ExifInterface.TAG_FLASH,
            ExifInterface.TAG_FOCAL_LENGTH,
            ExifInterface.TAG_GPS_ALTITUDE,
            ExifInterface.TAG_GPS_ALTITUDE_REF,
            ExifInterface.TAG_GPS_DATESTAMP,
            ExifInterface.TAG_GPS_LATITUDE,
            ExifInterface.TAG_GPS_LATITUDE_REF,
            ExifInterface.TAG_GPS_LONGITUDE,
            ExifInterface.TAG_GPS_LONGITUDE_REF,
            ExifInterface.TAG_GPS_PROCESSING_METHOD,
            ExifInterface.TAG_GPS_TIMESTAMP,
            ExifInterface.TAG_IMAGE_LENGTH,
            ExifInterface.TAG_IMAGE_WIDTH,
            ExifInterface.TAG_ISO,
            ExifInterface.TAG_MAKE,
            ExifInterface.TAG_MODEL,
            ExifInterface.TAG_ORIENTATION,
            ExifInterface.TAG_X_RESOLUTION,
            ExifInterface.TAG_Y_RESOLUTION,
            ExifInterface.TAG_SUBSEC_TIME,
            ExifInterface.TAG_SUBSEC_TIME_DIG,
            ExifInterface.TAG_SUBSEC_TIME_ORIG,
            ExifInterface.TAG_WHITE_BALANCE,
            ExifInterface.TAG_BITS_PER_SAMPLE,
            ExifInterface.TAG_COMPRESSED_BITS_PER_PIXEL,
            ExifInterface.TAG_COLOR_SPACE,
            ExifInterface.TAG_FLASH,
            ExifInterface.TAG_SOFTWARE,
            ExifInterface.TAG_Y_CB_CR_POSITIONING,
            ExifInterface.TAG_RESOLUTION_UNIT,
            ExifInterface.TAG_EXPOSURE_PROGRAM,
            ExifInterface.TAG_EXIF_VERSION,
            ExifInterface.TAG_EXPOSURE_BIAS_VALUE,
            ExifInterface.TAG_MAX_APERTURE_VALUE,
            ExifInterface.TAG_METERING_MODE,
            ExifInterface.TAG_INTEROPERABILITY_INDEX,
            ExifInterface.TAG_MAKER_NOTE,
            ExifInterface.TAG_BITS_PER_SAMPLE,
            ExifInterface.TAG_SHUTTER_SPEED_VALUE
    };

    public Exif(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "Exif";
    };

    @ReactMethod
    public void getExif(String uri, Callback successCallback, Callback errorCallback) {
        try {
            ExifInterface exif = createExifInterface(uri);

            WritableMap exifMap = Arguments.createMap();
            for (String attribute : EXIF_ATTRIBUTES) {
                String value = exif.getAttribute(attribute);
                exifMap.putString(attribute, value);
            }

            exifMap.putString("originalUri", uri);

            successCallback.invoke(exifMap);
        } catch (Exception e) {
            errorCallback.invoke(e.toString());
        }
    }

    @ReactMethod
    public void getLatLong(String uri, Callback successCallback, Callback errorCallback) {
        try {
            ExifInterface exif = createExifInterface(uri);

            float[] latLong = new float[2];
            exif.getLatLong(latLong);

            WritableMap responseMap = Arguments.createMap();
            responseMap.putDouble("latitude", latLong[0]);
            responseMap.putDouble("longitude", latLong[1]);

            successCallback.invoke(responseMap);
        } catch (Exception e) {
            errorCallback.invoke(e.toString());
        }
    }

    private ExifInterface createExifInterface(String uri) throws Exception {
        if (uri.startsWith("content://")) {
            uri = PathUtil.getRealPathFromURI(getReactApplicationContext(), Uri.parse(uri));
        }
        assert uri != null;
        return new ExifInterface(uri);
    }
}
