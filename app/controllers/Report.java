
package controllers;

import java.util.ArrayList;
import java.util.List;

import models.Residence;
import models.Tenant;
import models.Administrator;
import models.Landlord;
import play.mvc.Before;
import play.mvc.Controller;
import utils.Circle;
import utils.Geodistance;
import utils.LatLng;

public class Report extends Controller
{
  /**
   * This method executed before each action call in the controller.
   * Checks that a user has logged in.
   * If no user logged in the user is presented with the welcome screen.
   */
  static void checkAuthentification()
  {
    if(session.contains("logged_in_landlordid") == false && session.contains("logged_in_tenantid") == false )
    {
      Welcome.index();
    }
  }

  /**
   *  Generates a Report instance relating to all residences within circle
   * @param radius    The radius (metres) of the search area
   * @param latcenter The latitude of the centre of the search area
   * @param lngcenter The longtitude of the centre of the search area
   */
  public static void generateReport(double radius, double latcenter, double lngcenter)
  {
    // All reported residences will fall within this circle
    Circle circle = new Circle(latcenter, lngcenter, radius);
    Landlord currentLandlord = Landlords.getCurrentLandlord();
    Tenant currentTenant = Tenants.getCurrentTenant();
    Administrator currentAdministrator = Administrators.getCurrentAdministrator();
    List<Residence> residences = new ArrayList<Residence>();
    // Fetch all residences and filter out those within circle
    List<Residence> residencesAll = Residence.findAll();
    for (Residence res : residencesAll)
    {
      //LatLng residenceLocation = res.getGeolocation();
      LatLng residenceLocation = LatLng.toLatLng(res.location);
      if (Geodistance.inCircle(residenceLocation, circle))
      {
        residences.add(res);
      }
    }
    render("Report/renderReport.html", currentLandlord,currentAdministrator, currentTenant, circle, residences);
  }

  /**
   * Render the views/ReporController/index.html template
   * This presents a map and resizable circle to indicate a search area for residences
   */
  public static void index()
  {
    Administrator currentAdministrator = Administrators.getCurrentAdministrator();
    Tenant currentTenant = Tenants.getCurrentTenant();
    Landlord currentLandlord = Landlords.getCurrentLandlord();
    render(currentLandlord, currentTenant,currentAdministrator);
  }
}
