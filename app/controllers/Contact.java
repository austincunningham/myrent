package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Contact extends Controller
{

  public static void index()
  {
    render();
  }

  public static void sendMessage(String fName,String lName,String cEmail,String msgtxt)
  {
    Landlord landlord = Landlords.getCurrentLandlord();
    ContactModel con = new ContactModel(fName, lName,cEmail ,msgtxt);
    con.save();
    render("Contact/acknowledge.html" ,con,landlord);
  }
}