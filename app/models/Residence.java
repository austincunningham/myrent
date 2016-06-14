package models;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import play.Logger;
import play.db.jpa.Model;

@Entity
public class Residence extends Model
{

  public int rent;
  public int bedrooms;
  public String status;
  public String type;
  public String location;
  public String formatDate;
  @ManyToOne
  public User from;

  public Residence(User from, String location, String type, String status, int bedrooms, int rent)
  {
    this.from = from;
    this.location = location;
    this.rent = rent;
    this.type = type;
    this.bedrooms = bedrooms;
    this.status = status;
    formatDate = dateFormatter();
  }

  public String dateFormatter()
  {
    Date createOn = new Date();
    createOn = new Timestamp(createOn.getTime());
    DateFormat df = new SimpleDateFormat("E dd/MM/yy - KK:mm a");
    Logger.info("createdOn " + createOn + " formatDate " + df.format(createOn));
    return df.format(createOn);

  }
}
