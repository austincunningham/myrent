package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Tenants extends Controller
{

  public static void signup()
  {
    render();
  }

  public static void login()
  {
    render();
  }

  /**
   * removes the logged_in_tenantid from the session
   */
    public static void logout()
    {
      Landlord landlord = Landlords.getCurrentLandlord();
      Tenant tenant = getCurrentTenant();
      
      //session.clear();
      // session.get looks for logged_in_tenantid to confirm logged in tenant
      session.remove("logged_in_tenantid");
      Welcome.index();
    }
/**
 * parma passed from form in Tenants/signup.html to model User to populate DB
 * @param firstName
 * @param lastName
 * @param email
 * @param password
 * @param tenantReference
 */
  public static void register(String firstName, String lastName, String email, String password, Residence residence)
  {
    Logger.info(firstName + " " + lastName + " " + email + " " + password);
    Tenant tenant = new Tenant(firstName, lastName, email, password,residence);
    tenant.save();
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
    Tenant tenant = Tenant.findByEmail(email);
    if ((tenant != null) && (tenant.checkPassword(password) == true))
    {
      session.put("logged_in_tenantid", tenant.id);
      Logger.info("Authentication successful for tentant id : " +tenant.id);
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
  public static Tenant getCurrentTenant()
  {
    String userId = session.get("logged_in_tenantid");
    String id = session.get(userId);
    Logger.info("tenant Session id "+ userId);
    if (userId == null)
    {
      return null;
    }
    Tenant logged_in_user = Tenant.findById(Long.parseLong(userId));
    Logger.info("Logged in Tenant: " + logged_in_user.firstName);
    return logged_in_user;
  }


}