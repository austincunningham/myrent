package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class InputData extends Controller
{

  public static void index()
  {
    render();
  }
  public static void InputData(String location, int rent,int bedrooms, String status, String type)
  {
    User user = Accounts.getCurrentUser();
    Residence locate = new Residence(user, location,type ,status, bedrooms,rent);
    locate.save();
    index();
  }
  
}