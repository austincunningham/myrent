package models;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import play.Logger;
import play.db.jpa.Model;
import utils.LatLng;

@Entity
public class Residence extends Model
{

  public int rent;
  public int bedrooms;
  public String type;
  public String location;
  public String formatDate;
  public int area;
  public int numberBathrooms;
  public String eircode;
  
  @ManyToOne
  public Landlord from;
  
 //removes both sides of relationship from DB when Residence is deleted 
  @OneToOne(mappedBy = "residence", cascade = CascadeType.ALL)
  public Tenant tenant;
  

  public Residence(Landlord from, String location,String eircode, String type, int bedrooms, int rent, int area,int numberBathrooms)
  {
    this.from = from;
    this.location = location;
    this.eircode = eircode;
    this.rent = rent;
    this.type = type;
    this.bedrooms = bedrooms;
    this.area = area;
    this.numberBathrooms = numberBathrooms;
    formatDate = dateFormatter();
  }
/**
 * 
 * @return String with new date format
 */
  public String dateFormatter()
  {
    Date createOn = new Date();
    createOn = new Timestamp(createOn.getTime());
    DateFormat df = new SimpleDateFormat("E dd/MM/yy - KK:mm a");
    Logger.info("createdOn " + createOn + " formatDate " + df.format(createOn));
    return df.format(createOn);

  }
}
