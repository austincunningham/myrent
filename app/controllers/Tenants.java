package controllers;

import play.*;
import play.db.jpa.JPABase;
import play.mvc.*;
import utils.Circle;
import utils.Geodistance;
import utils.LatLng;

import java.util.*;

import org.json.simple.JSONObject;

import models.*;

public class Tenants extends Controller
{
  public static void index()
  {
    Tenant tenant = Tenants.getLoggedin();
    List<Residence> allResidence = new ArrayList();
    allResidence = Residence.findAll();
    List<Residence> residences = new ArrayList();
    List<Tenant> allTenants = new ArrayList();
    allTenants = Tenant.findAll();
    for (Residence res : allResidence)
    {
      if (res.tenant != null)
      {
        Logger.info("No tenant present");
      }
      else
      {
        Logger.info("Adding tenant");
        residences.add(res);
      }
    }
    Residence tenantResidence = tenant.residence;

    render(tenantResidence, residences);
  }

  public static Tenant getLoggedin()
  {
    Tenant tenant = null;
    if (session.get("logged_in_tenantid") != null)
    {
      String tenantId = session.get("logged_in_tenantid");
          tenant = Tenant.findById(Long.parseLong(tenantId));
      
    }
    else
    {
      Welcome.index();
    }
    return tenant;
  }
  
  public static void signup()
  {
    Administrator currentAdministrator = Administrators.getCurrentAdministrator();
    render(currentAdministrator);
  }

  public static void login()
  {
    // clears any logged in users from app
    session.clear();
    render();
  }

  /**
   * removes the logged_in_tenantid from the session
   */
  public static void logout()
  {
    Landlord landlord = Landlords.getCurrentLandlord();
    Tenant tenant = getCurrentTenant();

    // session.clear();
    // session.get looks for logged_in_tenantid to confirm logged in tenant
    session.remove("logged_in_tenantid");
    Welcome.index();
  }

  /**
   * parma passed from form in Tenants/signup.html to model User to populate DB
   * 
   * @param firstName
   * @param lastName
   * @param email
   * @param password
   * @param tenantReference
   */
  //public static void register(String firstName, String lastName, String email, String password, Residence residence)
  public static void register(String firstName, String lastName, String email, String password,String tenantReference)
  {
    Administrator currentAdministrator = Administrators.getCurrentAdministrator();
    Logger.info(firstName + " " + lastName + " " + email + " " + password);
    //Tenant tenant = new Tenant(firstName, lastName, email, password, residence);
    Tenant tenant = new Tenant(firstName, lastName, email, password,tenantReference);
    tenant.save();
    if (currentAdministrator != null)
    {
      Administrators.index();
    }
    else
    {
      login();
    }

  }

  /**
   * compares param with DB to authenticate
   * 
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
      Logger.info("Authentication successful for tentant id : " + tenant.id);
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
   * 
   * @return
   */
  public static Tenant getCurrentTenant()
  {
    String userId = session.get("logged_in_tenantid");
    Logger.info("tenant Session id " + userId);
    if (userId == null)
    {
      return null;
    }
    Tenant logged_in_user = Tenant.findById(Long.parseLong(userId));
    Logger.info("Logged in Tenant: " + logged_in_user.firstName);
    return logged_in_user;
  }

  /**
   * Search for current logged in Tenant and sets the residence to null
   */
  public static void deleteResidence()
  {
    Tenant tenant = Tenants.getCurrentTenant();
    tenant.residence = null;
    tenant.save();
    index();
  }

  public static void deleteTenant(long deleteTenant)
  {
    Tenant tenant = Tenant.findById(deleteTenant);
    Logger.info("Deleting Tenant : "+tenant.firstName);
    //String value = "Congratulations. You have successfully deleted "+ tenant.email +".";
    //JSONObject obj = new JSONObject();
    //obj.put("index", value);
    tenant.delete();
    Administrators.administratorResidences();
    //renderJSON(obj);
    //Administrators.index();
  }
  
  public static void selectResidence(long selectResidence)
  {
    Logger.info(" residence id from form : " + selectResidence);
    Residence res = Residence.findById(selectResidence);
    Tenant tenant = Tenants.getCurrentTenant();
    tenant.residence = res;
    // Logger.info(" res.eircode : "+res.eircode);
    tenant.save();
    index();
  }

  /**
   * Generates a Report instance relating to all residences within circle
   * 
   * @param radius
   *          The radius (metres) of the search area
   * @param latcenter
   *          The latitude of the centre of the search area
   * @param lngcenter
   *          The longtitude of the centre of the search area
   */
  public static void Report(double radius, double latcenter, double lngcenter)
  {
    // All reported residences will fall within this circle
    Circle circle = new Circle(latcenter, lngcenter, radius);
    Landlord currentLandlord = Landlords.getCurrentLandlord();
    Tenant currentTenant = Tenants.getCurrentTenant();
    List<Residence> allResidences = new ArrayList<Residence>();
    List<Residence> residences = new ArrayList<Residence>();
    List<Residence> allResidence = Residence.findAll();
    // find vacant residences and put in an arraylist
    for (Residence res : allResidence)
    {
      if (res.tenant != null)
      {
        Logger.info("No tenant present");
      }
      else
      {
        Logger.info("Adding residence with tenant " +res.eircode);
        allResidences.add(res);
      }
    }
        
    // Fetch all vacant residences and filter out those within circle
    for (Residence residence : allResidences)
    {
      LatLng residenceLocation = LatLng.toLatLng(residence.location);
      Logger.info("residenceLocation" + residenceLocation + " circle " + circle);
      if (Geodistance.inCircle(residenceLocation, circle))
      {
        Logger.info("adding residence of id : " + residence.id);
        residences.add(residence);
      }
    }
    render("Tenants/renderReport.html", currentLandlord, currentTenant, circle, residences);
  }
  
  public static void vacant()
  {
    List<List<String>> jsonArray = new ArrayList<List<String>>();
    List<Residence> allResidence = Residence.findAll();
    int i = 0;
    for (Residence res : allResidence)
    {
      if (res.tenant != null)
      {
        Logger.info("No tenant present");
      }
      else
      {
        Logger.info("Adding vacant residence with eircode : " +res.eircode);

        jsonArray.add(i, Arrays.asList(res.eircode, res.location));
        i++;
      }
    }
    renderJSON(jsonArray );

  }
}