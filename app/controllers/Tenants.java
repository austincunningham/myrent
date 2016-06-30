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
 * parma passed from form in Tenants/signup.html to model User to populate DB
 * @param firstName
 * @param lastName
 * @param email
 * @param password
 * @param tenantReference
 */
  public static void register(String firstName, String lastName, String email, String password, String tenantReference)
  {
    Logger.info(firstName + " " + lastName + " " + email + " " + password);
    Tenant tenant = new Tenant(firstName, lastName, email, password,tenantReference);
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
    Tenant user = Tenant.findByEmail(email);
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
  public static Tenant getCurrentTenant()
  {
    String userId = session.get("logged_in_userid");
    Logger.info("Session id", userId);
    if (userId == null)
    {
      return null;
    }
    Tenant logged_in_user = Tenant.findById(Long.parseLong(userId));
    Logger.info("Logged in User: " + logged_in_user.firstName);
    return logged_in_user;
  }


}