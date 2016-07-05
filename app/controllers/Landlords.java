package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Landlords extends Controller
{
/**
 * Renders Landlords/index.html 
 * filters residences list to current logged in landlords residences
 */
  public static void index()
  { 
    List<Residence> AllResidence = new ArrayList();
    AllResidence = Residence.findAll();
    Tenant currentTenant = Tenants.getCurrentTenant();
    Landlord currentLandlord = getCurrentLandlord();
    List<Residence> residence = new ArrayList();
    for(Residence res : AllResidence)
    {
      if( res.from.id == currentLandlord.id)
      {
        residence.add(res);
      }
    }
    render(currentLandlord, residence, currentTenant);
  }

  public static void signup()
  {
    Tenant currentTenant = Tenants.getCurrentTenant();
    Landlord currentLandlord = getCurrentLandlord();
    render(currentLandlord, currentTenant);
  }

  public static void login()
  {
    session.clear();
    render();
  }
  public static void editdetail()
  {
    Landlord currentLandlord = getCurrentLandlord();
    Tenant currentTenant = Tenants.getCurrentTenant();
    render(currentLandlord, currentTenant);
  }
/**
 * removes the logged_in_landlordid from the session
 */
  public static void logout()
  {
    Landlord landlord = getCurrentLandlord();
    Tenant tenant = Tenants.getCurrentTenant();
    
    //session.clear();
    // session.get looks for logged_in_landlordid to confirm logged in landlord
    session.remove("logged_in_landlordid");
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
    Landlord landlord = Landlord.findByEmail(email);
    if ((landlord != null) && (landlord.checkPassword(password) == true))
    {
      session.put("logged_in_landlordid", landlord.id);
      Logger.info("Authentication successful for landlord id "+ landlord.id);
      index();
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
    String userId = session.get("logged_in_landlordid");
    Logger.info("landlord Session id "+ userId);
    if (userId == null)
    {
      return null;
    }
    Landlord logged_in_user = Landlord.findById(Long.parseLong(userId));
    Logger.info("Logged in Landlord: " + logged_in_user.firstName);
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
        Logger.info("do i get into Landlords/editDetails ");
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

  public static void residenceEdit(Long editResidence)
  { 
    Residence residence = Residence.findById(editResidence);
    Landlord currentLandlord = getCurrentLandlord();
    render(currentLandlord, residence);
  }
  /**
   * finds residence by id and deletes it , because of OneToOne relationship the linked tenant is also deleted
   * backupTenant backs up linked tenant and restores after residence delete 
   * @param deleteResidence
   */
  public static void residenceDelete(Long deleteResidence)
  {
    Residence residence = Residence.findById(deleteResidence);
    residence.delete();
    index();    
  }
  
  public static void deleteLandlord(Long deleteLandlord)
  {
    Landlord landlord = Landlord.findById(deleteLandlord);
    landlord.delete();
    Administrators.index();    
  }

}