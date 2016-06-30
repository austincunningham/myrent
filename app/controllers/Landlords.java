package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Landlords extends Controller
{

  public static void index()
  {
    render();
  }

  public static void signup()
  {
    render();
  }

  public static void login()
  {
    render();
  }
  public static void editdetails()
  {
    Landlord landlord = getCurrentLandlord();
    render(landlord);
  }
/**
 * clears the session id
 */
  public static void logout()
  {
    session.clear();
    Welcome.index();
  }
/**
 * parma passed from form in Accounts/signup.html to model User to populate DB
 * @param firstName
 * @param lastName
 * @param email
 * @param password
 */
  public static void register(String firstName, String lastName, String email, String password, 
      String line1Address, String line2Address, String city, String county)
  {
    Logger.info(firstName + " " + lastName + " " + email + " " + password);
    Landlord landlord = new Landlord(firstName, lastName, email, password,line1Address,
        line2Address,city,county);
    landlord.save();
    login();

  }
/**
 * compares param with DB to authenticate
 * @param email
 * @param password
 */
  public static void authenticate(String email, String password)
  {
    Logger.info("Attempting to authenticate with " + email + ":" + password);
    Landlord user = Landlord.findByEmail(email);
    if ((user != null) && (user.checkPassword(password) == true))
    {
      Logger.info("Authentication successful");
      session.put("logged_in_userid", user.id);
      InputData.index();
    }
    else
    {
      Logger.info("Authentication failed");
      login();
    }
  }
/**
 * Checks session id for current user id
 * @return
 */
  public static Landlord getCurrentLandlord()
  {
    String userId = session.get("logged_in_userid");
    if (userId == null)
    {
      return null;
    }
    Landlord logged_in_user = Landlord.findById(Long.parseLong(userId));
    Logger.info("Logged in User: " + logged_in_user.firstName);
    return logged_in_user;
  }
  
  /**
   * Checks all fields in form /Landlords/editDetails for input
   * @param firstName
   * @param lastName
   * @param line1Address
   * @param line2Address
   * @param city
   * @param country
   */
  public static void editDetails(String firstName, String lastName, String line1Address, String line2Address, String city, String county) 
  {
    
        Landlord landlord = getCurrentLandlord();
        
        if (!firstName.isEmpty())
        {
          landlord.firstName = firstName;
          Logger.info(
            "The following user first name has been edited -->" + landlord.firstName + " " + landlord.lastName);
        }
        if (!lastName.isEmpty())
        {
          landlord.lastName= lastName;
          Logger.info(
            "The following user last name has been edited -->" + landlord.firstName + " " + landlord.lastName);
        }
        if (!line1Address.isEmpty())
        {
          landlord.line1Address = line1Address;
          Logger.info(
              "The following users line one of address -->" + landlord.firstName + " " + landlord.lastName);
        }
        if (!line2Address.isEmpty())
        {
          landlord.line2Address = line2Address;
          Logger.info(
              "The following users line two of address -->" + landlord.firstName + " " + landlord.lastName);
        }
        if (!city.isEmpty())
        {
          landlord.city = city;
          Logger.info(
              "The following users city had been edited -->" + landlord.firstName + " " + landlord.lastName);
        }
        if (!county.isEmpty())
        {
          landlord.county = county;
          Logger.info(
              "The following users city had been edited -->" + landlord.firstName + " " + landlord.lastName);
        }
  landlord.save();

  Welcome.index();
  }

}