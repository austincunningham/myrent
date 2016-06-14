package models;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import play.db.jpa.Model;

@Entity
public class Residence extends Model
{

  public int rent;
  public int bedrooms;
  public String status;
  public String type;
  public String location;

  public Residence(String location, String type,  String status,int bedrooms,int rent)
  {
    this.location = location;
    this.rent = rent;
    this.type = type;
    this.bedrooms = bedrooms;
    this.status = status;
  }
}
