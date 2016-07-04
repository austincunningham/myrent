package controllers;

import play.*;
import play.db.jpa.JPABase;
import play.mvc.*;
import utils.Circle;
import utils.Geodistance;
import utils.LatLng;

import java.util.*;

import models.*;

public class Administrator extends Controller
{

  public static void login()
  {
    // clears any logged in users from app
    session.clear();
    render();
  }
  public static void index()
  {
    render();
  }
  public static void authenticate(String email, String password)
  {
    Logger.info("Attempting to authenticate with " + email + ":" + password);
    
    if ((email == "admin@witpress.ie") && (password == "secret"))
    {
      long id = 1;
      session.put("logged_in_administratorid",id);
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
