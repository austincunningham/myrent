package utils;

import com.sun.media.sound.AudioSynthesizerPropertyInfo;

/**
 * @file    Circle.java
 * @brief   Class to facilitate instantiation of a circle defined by its radius and centre specified in latitude and longitude
 * @author  Austin Cunningham
 */
public class Circle {

  public double radius;
  public double latcenter;
  public double lngcenter;

  /**
   * Returns the center of the circle as a LatLng object
   * 
   * @return the center of the circle
   */
  public LatLng getCenter() 
  {
    return new LatLng(latcenter,lngcenter);
  }

  /**
   * Returns the radius of the circle
   * 
   * @return the radius of the circle
   */
  public double getRadius() 
  {
    return radius;
  }
  /**
   * Constructor to instantiate circle
   * @param lat the centre of the circle's latitude coordinate
   * @param lng the centre of the circle's longitude coordinate
   * @param radius the radius of the circle
   */
  public Circle(double lat, double lng, double radius) 
  {
    this.radius = radius;
    this.latcenter = lat;
    this.lngcenter = lng;
  }
}