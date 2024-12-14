/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (http://www.swig.org).
 * Version 4.0.2
 *
 * Do not make changes to this file unless you know what you are doing--modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

package io.adaptivecards.objectmodel;

public class StdOptionalVerticalContentAlignment {
  private transient long swigCPtr;
  protected transient boolean swigCMemOwn;

  protected StdOptionalVerticalContentAlignment(long cPtr, boolean cMemoryOwn) {
    swigCMemOwn = cMemoryOwn;
    swigCPtr = cPtr;
  }

  protected static long getCPtr(StdOptionalVerticalContentAlignment obj) {
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
        AdaptiveCardObjectModelJNI.delete_StdOptionalVerticalContentAlignment(swigCPtr);
      }
      swigCPtr = 0;
    }
  }

  public StdOptionalVerticalContentAlignment() {
    this(AdaptiveCardObjectModelJNI.new_StdOptionalVerticalContentAlignment__SWIG_0(), true);
  }

  public StdOptionalVerticalContentAlignment(VerticalContentAlignment arg0) {
    this(AdaptiveCardObjectModelJNI.new_StdOptionalVerticalContentAlignment__SWIG_1(arg0.swigValue()), true);
  }

  public boolean has_value() {
    return AdaptiveCardObjectModelJNI.StdOptionalVerticalContentAlignment_has_value(swigCPtr, this);
  }

  public VerticalContentAlignment value() {
    return VerticalContentAlignment.swigToEnum(AdaptiveCardObjectModelJNI.StdOptionalVerticalContentAlignment_value(swigCPtr, this));
  }

}