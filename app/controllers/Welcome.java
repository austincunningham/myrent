package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Welcome extends Controller
{

  public static void index()
  {
    Landlord currentLandlord = Landlords.getCurrentLandlord();
    render(currentLandlord);
  }

}