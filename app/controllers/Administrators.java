package controllers;

import play.*;
import play.db.jpa.JPABase;
import play.mvc.*;
import utils.Circle;
import utils.Geodistance;
import utils.LatLng;

import java.util.*;

import models.*;

public class Administrators extends Controller
{

  public static void login()
  {
    // clears any logged in users from app
    session.clear();
    render();
  }
  public static void logout()
  {
    session.remove("logged_in_administratorid");
    Welcome.index();
  }
  
  public static void index()
  {
    List<Tenant> tenants = new ArrayList<Tenant>();
    tenants = Tenant.findAll();
    List<Landlord> landlords = new ArrayList<Landlord>();
    landlords = Landlord.findAll();
    render(tenants, landlords);
  }
  
  /**
   * checks admin account exists and authenticates
   * @param email
   * @param password
   */
    public static void authenticate(String email, String password)
  {
    Administrator administrator = Administrator.findByEmail(email);
    if(administrator == null)
    {
      administrator = new Administrator("admin@witpress.ie", "secret");
      administrator.save();
    }
    Logger.info("Attempting to authenticate with " + email + ":" + password);
    if ((administrator != null) && (administrator.checkPassword(password) == true))
    {
      session.put("logged_in_administratorid", administrator.id);
      Logger.info("Authentication successful for Administrator ");
      index();
    }
    else
    {
      Logger.info("Authentication failed");
      login();
    }
  }
  
  
  
  
}
