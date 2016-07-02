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
   * Data passed from form in InputData\index.html to model Residence to
   * populate DB
   * 
   * @param location
   * @param rent
   * @param bedrooms
   * @param type
   * @param eircode
   * @param numberBathrooms
   * @param area
   */
  public static void InputData(String location, String eircode, int rent, int bedrooms, String type,
      int area, int numberBathrooms)
  {
    Landlord landlord = Landlords.getCurrentLandlord();
    Residence locate = new Residence(landlord, location, eircode, type, bedrooms, rent, area, numberBathrooms);
    locate.save();
    index();
  }

  public static void UpdateData(Long id, int rent)
  {
    Residence residence = Residence.findById(id);
    residence.rent = rent;
    residence.save();
    Landlords.index();
  }

}