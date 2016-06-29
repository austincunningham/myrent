package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class InputData extends Controller
{

  public static void index()
  {
    render();
  }
  /**
   * Data passed from form in InputData\index.html to model Residence to populate DB
   * @param location
   * @param rent
   * @param bedrooms
   * @param status
   * @param type
   */
  public static void InputData(String location, int rent,int bedrooms, String status, String type,int area, int numberBathrooms)
  {
    Landlord user = Landlords.getCurrentUser();
    Residence locate = new Residence(user, location,type ,status, bedrooms,rent, area, numberBathrooms);
    locate.save();
    index();
  }
  
}