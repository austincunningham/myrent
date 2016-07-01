package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class InputData extends Controller
{

  public static void index()
  {
    Landlord currentLandlord = Landlords.getCurrentLandlord();
    render(currentLandlord);
  }
  /**
   * Data passed from form in InputData\index.html to model Residence to populate DB
   * @param location
   * @param rent
   * @param bedrooms
   * @param status
   * @param type
   */
  public static void InputData(String location, int rent,int bedrooms, String status, String type,int area, int numberBathrooms, Tenant tenant)
  {
    Landlord landlord = Landlords.getCurrentLandlord();
    Residence locate = new Residence(landlord, location,type ,status, bedrooms,rent, area, numberBathrooms, tenant);
    locate.save();
    index();
  }
  
}