/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (http://www.swig.org).
 * Version 4.0.2
 *
 * Do not make changes to this file unless you know what you are doing--modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

package io.adaptivecards.objectmodel;

public class FontTypeDefinition {
  private transient long swigCPtr;
  protected transient boolean swigCMemOwn;

  protected FontTypeDefinition(long cPtr, boolean cMemoryOwn) {
    swigCMemOwn = cMemoryOwn;
    swigCPtr = cPtr;
  }

  protected static long getCPtr(FontTypeDefinition obj) {
    return (obj == null) ? 0 : obj.swigCPtr;
  }

  @SuppressWarnings("deprecation")
  protected void finalize() {
    delete();
  }

  public synchronized void delete() {
    if (swigCPtr != 0) {
      if (swigCMemOwn) {
        swigCMemOwn = false;
        AdaptiveCardObjectModelJNI.delete_FontTypeDefinition(swigCPtr);
      }
      swigCPtr = 0;
    }
  }

  public void setFontFamily(String value) {
    AdaptiveCardObjectModelJNI.FontTypeDefinition_fontFamily_set(swigCPtr, this, value);
  }

  public String getFontFamily() {
    return AdaptiveCardObjectModelJNI.FontTypeDefinition_fontFamily_get(swigCPtr, this);
  }

  public void setFontSizes(FontSizesConfig value) {
    AdaptiveCardObjectModelJNI.FontTypeDefinition_fontSizes_set(swigCPtr, this, FontSizesConfig.getCPtr(value), value);
  }

  public FontSizesConfig getFontSizes() {
    long cPtr = AdaptiveCardObjectModelJNI.FontTypeDefinition_fontSizes_get(swigCPtr, this);
    return (cPtr == 0) ? null : new FontSizesConfig(cPtr, false);
  }

  public void setFontWeights(FontWeightsConfig value) {
    AdaptiveCardObjectModelJNI.FontTypeDefinition_fontWeights_set(swigCPtr, this, FontWeightsConfig.getCPtr(value), value);
  }

  public FontWeightsConfig getFontWeights() {
    long cPtr = AdaptiveCardObjectModelJNI.FontTypeDefinition_fontWeights_get(swigCPtr, this);
    return (cPtr == 0) ? null : new FontWeightsConfig(cPtr, false);
  }

  public static FontTypeDefinition Deserialize(JsonValue json, FontTypeDefinition defaultValue) {
    return new FontTypeDefinition(AdaptiveCardObjectModelJNI.FontTypeDefinition_Deserialize(JsonValue.getCPtr(json), json, FontTypeDefinition.getCPtr(defaultValue), defaultValue), true);
  }

  public FontTypeDefinition() {
    this(AdaptiveCardObjectModelJNI.new_FontTypeDefinition(), true);
  }

}