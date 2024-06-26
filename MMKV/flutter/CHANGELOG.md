# MMKV for Flutter Change Log
## v1.3.2 / 2023-11-20
Among most of the features added in this version, the credit goes to @kaitian521.

* Add the feature of customizing the **initial file size** of an MMKV instance.
* **Optimize write speed** when there's only one key inside MMKV, the new key is the same as the old one, and MMKV is in `SINGLE_PROCESS_MODE`.
* **Optimize write speed** by overriding from the beginning of the file instead of append in the back, when there's zero key inside MMKV, and MMKV is in `SINGLE_PROCESS_MODE`.
* Add the feature of `clearAll()` with keeping file disk space unchanged, **reducing the need to expand file size** on later insert & update operations. This feature is off by default, you will have to call it with relative params or newly added methods. 
* Add the feature of **comparing values before setting/encoding** on the same key.
* Fix a potential bug that the MMKV file will be invalid state after a successful expansion but a failure `zeroFill()`, will lead to a crash.
* Fix a potential crash due to other module/static lib turn-off **RTTI**, which will cause MMKV to fail to catch `std::exception`.
* Fix several potential crash due to the MMKV file not being valid.
* Android: Use the `-O2` optimization level by default, which will **reduce native lib size** and improve read/write speed a little bit.
* Android: Experimantal use `@fastNative` annotation on `enableCompareBeforeCompare()` to speed up JNI call.
* Turn-off mlock() protection in background on iOS 13+. We have **verified it on WeChat** that the protection is no longer needed from at least iOS 13. Maybe iOS 12 or older is also not needed, but we don't have the chance to verify that because WeChat no longer supports iOS 12.

#### Known Issue
* On Xcode 15 build, App will crash on iOS 14 and below. The bug is introduced by Apple's new linker. The official solutions provided by Apple are either:
  * Drop the support of iOS 14.
  * Add `-Wl,-weak_reference_mismatches,weak` or `-Wl,-ld_classic` options to the `OTHER_LDFLAGS` build setting of Xcode 15. Note that these options are **not recognized** by older versions of Xcode.
  * Use older versions of Xcode, or **wait for Xcode 15.2**.

## v1.3.1 / 2023-8-11
This is a hotfix version. It's **highly recommended** that v1.2.16 & v1.3.0 users upgrade as soon as possible.
* Fix a critical bug that might cause multi-process MMKV corrupt. This bug was introduced in v1.2.16.
* Add the ability to filter expired keys on `count()` & `allKeys()` methods when auto key expiration is turn on.
* Reduce the `msync()` call on newly created MMKV instances.

## v1.3.0 / 2023-06-14
* Add auto key expiration feature. Note that this is a breaking change, once upgrade to auto expiration, the MMKV file is not valid for older versions of MMKV (v1.2.16 and below) to correctly operate.
* Roll back the lazy load optimization due to reported ANR issues. It was introduced in v1.2.16.
* The version is now the same as the MMKV native library.
* Starting from v1.3.0, Flutter for Android will use `com.tencent:mmkv`. Previously it's `com.tencent:mmkv-static`. It's the same as `com.tencent:mmkv` starting from v1.2.11.

## v1.2.17 / 2023-04-20
* Optimization: The actual file content is lazy loaded now, saving time on MMKV instance creation, and avoiding lock waiting when a lot of instances are created at the same time.
* Fix a bug when restoring a loaded MMKV instance the meta file might mistakenly report corrupted.
* Fix a crash on decoding an empty list.
* Remove deprecated dependence.
* Make the script more robust to fix the iOS Flutter plugin name.
* Keep up with MMKV native lib v1.2.16.

## v1.2.16 / 2023-01-12
* Reduce the privacy info needed to obtain android sdkInt, avoid unnecessary risk on Android App Review.
* Log handler now handles all logs from the very beginning, especially the logs in initialization.
* Log handler register method is now deprecated. It's integrated with initialize().
* Keep up with MMKV native lib v1.2.15.

## v1.2.15 / 2022-08-10
* Fix a bug that `MMKV.decodeXXX()` may return invalid results in multi-process mode.
* Upgrade to Flutter 3.0.
* Keep up with MMKV native lib v1.2.14.

## v1.2.14 / 2022-03-30
* Replace the deprecated `device_info` package with `device_info_plus`.
* Keep up with MMKV native lib v1.2.13.

## v1.2.13 / 2022-01-17
* Fix a bug that a subsequential `clearAll()` call may fail to take effect in multi-process mode.
* Hide some OpenSSL symbols to prevent link-time symbol conflict, when an App somehow also static linking OpenSSL.
* Upgrade Android `compileSdkVersion` & `targetSdkVersion` from `30` to `31`.
* Keep up with MMKV native lib v1.2.12.

## v1.2.12 / 2021-10-26
* Add backup & restore ability.
* Keep up with MMKV native lib v1.2.11.

## v1.2.11 / 2021-06-25
* Bug Fixed: When building on iOS, occasionally it will fail on symbol conflict with other libs. We have renamed all public native methods to avoid potential conflict.
* Keep up with MMKV native lib v1.2.10.

## v1.2.10 / 2021-05-26
* Bug Fixed: When calling `MMKV.encodeString()` with an empty string value on Android, `MMKV.decodeString()` will return `null`.
* Bug Fixed: After upgrading from Flutter 1.20+ to 2.0+, calling `MMKV.defaultMMKV()` on Android might fail to load, you can try calling `MMKV.defaultMMKV(cryptKey: '\u{2}U')` instead.
* Keep up with MMKV native lib v1.2.9, which drops the **armeabi** arch on Android.

## v1.2.9 / 2021-05-06
* Support null-safety.
* Upgrade to Flutter 2.0.
* Keep up with MMKV native lib v1.2.8, which migrates the Android Native Lib to Maven Central Repository.
* Fix `MMKV.encodeString()` crash on iOS with an empty string value.

### Known Issue
* When calling `MMKV.encodeString()` with an empty string value on Android, `MMKV.decodeString()` will return `null`. This bug will be fixed in the next version of Android Native Lib. iOS does not have such a bug.

## v1.2.8 / 2020-12-25
* Keep up with MMKV native lib v1.2.7, which fix the `MMKV.sync(false)` not being asynchronous bug.
* Fix `MMKV.defaultMMKV()` crash on iOS simulator.
* Fix `MMKV.defaultMMKV(cryptKey)` not encrypted as expected bug on iOS.

## v1.2.7 / 2020-11-27
Fix iOS symbol not found bug.

## v1.2.6 / 2020-11-27
The first official flutter plugin of MMKV. Most things actually work!
