package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Contact extends Controller
{

  public static void index()
  {
    Tenant currentTenant = Tenants.getCurrentTenant();
    Landlord currentLandlord = Landlords.getCurrentLandlord();
    render(currentLandlord, currentTenant);
  }

  public static void sendMessage(String fName,String lName,String cEmail,String msgtxt)
  {
    Landlord currentLandlord = Landlords.getCurrentLandlord();
    Tenant currentTenant = Tenants.getCurrentTenant();
    ContactModel con = new ContactModel(fName, lName,cEmail ,msgtxt);
    con.save();
    render("Contact/acknowledge.html" ,con,currentLandlord, currentTenant);
  }
}