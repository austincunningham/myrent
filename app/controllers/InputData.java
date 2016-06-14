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
  private static void InputData(String location, int rent,int bedrooms, String status, String type)
  {
    Residence locate = new Residence( location,type ,status, bedrooms,rent);
    locate.save();
  }
  
}