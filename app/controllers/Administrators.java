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

  public static Administrator getLoggedin()
  {
    Administrator admin = null;
    if (session.get("logged_in_administratorid") != null)
    {
      String administratorId = session.get("logged_in_administratorid");
      admin = Administrator.findById(Long.parseLong(administratorId));

    }
    else
    {
      Welcome.index();
    }
    return admin;
  }

  public static Administrator getCurrentAdministrator()
  {
    String administratorId = session.get("logged_in_administratorid");
    Logger.info("landlord Session id " + administratorId);
    if (administratorId == null)
    {
      return null;
    }
    Administrator logged_in_administrator = Administrator.findById(Long.parseLong(administratorId));
    Logger.info("Logged in Administrator: " + logged_in_administrator.email);
    return logged_in_administrator;
  }

  public static void index()
  {
    Administrator admin = Administrators.getLoggedin();
    List<Tenant> tenants = new ArrayList<Tenant>();
    tenants = Tenant.findAll();
    List<Landlord> landlords = new ArrayList<Landlord>();
    landlords = Landlord.findAll();
    render(admin, tenants, landlords);
  }

  /**
   * checks admin account exists and authenticates
   * 
   * @param email
   * @param password
   */
  public static void authenticate(String email, String password)
  {
    Administrator administrator = Administrator.findByEmail(email);
    if (administrator == null)
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

  /**
   * Passes a list of all residences to a jsonArray to be displayed on an Google
   * Map values passed: eircode, tenant.firstName,tenant.lastName if no tenant
   * present passes values "Vacant", "Residence"
   */
  public static void administratorResidences()
  {
    List<List<String>> jsonArray = new ArrayList<List<String>>();
    List<Residence> allResidence = Residence.findAll();
    List<Tenant> allTenants = Tenant.findAll();
    int i = 0;

    for (Residence res : allResidence)
    {
      if (res.tenant == null)
      {
        Logger.info("Adding residence with eircode to json: " + res.eircode);
        Logger.info("Tenant vacant");
        jsonArray.add(i, Arrays.asList(res.eircode, res.location, "Vacant", "Residence"));

      }
      else
      {
        Logger.info("Adding residence with eircode to json : " + res.eircode);
        jsonArray.add(i, Arrays.asList(res.eircode, res.location, res.tenant.firstName, res.tenant.lastName));
      }
      i++;
    }
    renderJSON(jsonArray);
  }

  public static void renderReport()
  {
    Administrator admin = Administrators.getLoggedin();
    render();
  }
  
  public static void charts()
  {
    Administrator admin = Administrators.getLoggedin();
    render();
  }

  public static void findAllResidences()
  {
    List<List<String>> jsonArray = new ArrayList<List<String>>();
    List<Residence> residences = new ArrayList<Residence>();
    List<Tenant> allTenants = new ArrayList<Tenant>();
    allTenants = Tenant.findAll();
    residences = Residence.findAll();

    int i = 0;
    for (Residence res : residences)
    {
      if (res.tenant == null)
      {
        jsonArray.add(i, Arrays.asList(res.eircode, res.from.firstName, res.from.lastName, "Vacant", "Residence",
            res.formatDate, "" + res.rent, res.type, "" + res.bedrooms, "" + res.numberBathrooms, "" + res.area));
      }
      else
      {
        jsonArray.add(i,
            Arrays.asList(res.eircode, res.from.firstName, res.from.lastName, res.tenant.firstName, res.tenant.lastName,
                res.formatDate, "" + res.rent, res.type, "" + res.bedrooms, "" + res.numberBathrooms, "" + res.area));
      }
      i++;
    }
    renderJSON(jsonArray);
  }
}
