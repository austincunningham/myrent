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
        jsonArray.add(i, Arrays.asList(res.eircode, res.location, "Vacant", "Residence",null));

      }
      else
      {
        Logger.info("Adding residence with eircode to json : " + res.eircode);
        jsonArray.add(i, Arrays.asList(res.eircode, res.location, res.tenant.firstName, res.tenant.lastName
            ,res.tenant.email));
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
  
  /**
   * Creates a jsonArray to be passed to charts.html and on to /public/javascripts/adminPieChart.js
   * values passed from Residence:
   * from.firstName, from.lastName, rent
   * list is filter to exclude vacant Residences. 
   * Also duplicate landlord entries have there rent summed to one entry 
   */
  public static void dataCharts()
  {
    List<List<String>> jsonArray1 = new ArrayList<List<String>>();
    List<Residence> residences = new ArrayList<Residence>();
    List<Residence> landlordOnce = new ArrayList<Residence>();
    List<Tenant> allTenants = new ArrayList<Tenant>();
    allTenants = Tenant.findAll();
    residences = Residence.findAll();
    int z =0;
    int sum=0;
    //filter residence to remove vacant residences
    for(Residence res : residences)
    {
      if (res.tenant == null)
      { 
        Logger.info("DO NOTHING");
      }
      else 
      {
        landlordOnce.add(res);
      }
    }
    //filter residences for duplicate landlords,remove duplicates and sum their rent
    for(int i = 0; i < landlordOnce.size(); i++)
    {
        for(int j = i + 1; j < landlordOnce.size(); j++)
        {
          if (landlordOnce.get(i).from .equals(landlordOnce.get(j).from))
          {
            sum = landlordOnce.get(j).rent + landlordOnce.get(i).rent;
            Logger.info("Sum: "+sum);
            landlordOnce.get(i).rent = sum;
            landlordOnce.remove(j);
            j--;
          }
        }
    }
    // add filtered list to jsonArray
    for (Residence res : landlordOnce)
    {
        Logger.info("z equals what?? "+z);
        jsonArray1.add(z, Arrays.asList( ""+res.rent ,res.from.firstName+" "+res.from.lastName));
        z++;
    }    
    renderJSON(jsonArray1);
  }

  /**
   * Creates a jsonArray of all residences, 
   * Adds 'Vacant' 'Residences' to residences with out tenants.
   */
  public static void findAllResidences()
  {
    List<List<String>> jsonArray = new ArrayList<List<String>>();
    List<Residence> residences = new ArrayList<Residence>();
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
