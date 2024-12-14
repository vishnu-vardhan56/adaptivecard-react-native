/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (http://www.swig.org).
 * Version 4.0.2
 *
 * Do not make changes to this file unless you know what you are doing--modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

package io.adaptivecards.objectmodel;

public class MediaSource {
  private transient long swigCPtr;
  private transient boolean swigCMemOwn;

  protected MediaSource(long cPtr, boolean cMemoryOwn) {
    swigCMemOwn = cMemoryOwn;
    swigCPtr = cPtr;
  }

  protected static long getCPtr(MediaSource obj) {
    return (obj == null) ? 0 : obj.swigCPtr;
  }

  protected void swigSetCMemOwn(boolean own) {
    swigCMemOwn = own;
  }

  @SuppressWarnings("deprecation")
  protected void finalize() {
    delete();
  }

  public synchronized void delete() {
    if (swigCPtr != 0) {
      if (swigCMemOwn) {
        swigCMemOwn = false;
        AdaptiveCardObjectModelJNI.delete_MediaSource(swigCPtr);
      }
      swigCPtr = 0;
    }
  }

  public MediaSource() {
    this(AdaptiveCardObjectModelJNI.new_MediaSource__SWIG_0(), true);
  }

  public MediaSource(MediaSource arg0) {
    this(AdaptiveCardObjectModelJNI.new_MediaSource__SWIG_1(MediaSource.getCPtr(arg0), arg0), true);
  }

  public JsonValue SerializeToJsonValue() {
    return new JsonValue(AdaptiveCardObjectModelJNI.MediaSource_SerializeToJsonValue(swigCPtr, this), true);
  }

  public String GetMimeType() {
    return AdaptiveCardObjectModelJNI.MediaSource_GetMimeType(swigCPtr, this);
  }

  public void SetMimeType(String value) {
    AdaptiveCardObjectModelJNI.MediaSource_SetMimeType(swigCPtr, this, value);
  }

  public String GetUrl() {
    return AdaptiveCardObjectModelJNI.MediaSource_GetUrl(swigCPtr, this);
  }

  public void SetUrl(String value) {
    AdaptiveCardObjectModelJNI.MediaSource_SetUrl(swigCPtr, this, value);
  }

  public void GetResourceInformation(RemoteResourceInformationVector resourceInfo) {
    AdaptiveCardObjectModelJNI.MediaSource_GetResourceInformation(swigCPtr, this, RemoteResourceInformationVector.getCPtr(resourceInfo), resourceInfo);
  }

}