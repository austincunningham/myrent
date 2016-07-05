package models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import play.Logger;
import play.db.jpa.Model;
import utils.LatLng;

@Entity
public class Administrator extends Model
{

  public String email;
  public String password;
    

  public Administrator(String email ,String password)
  {
    this.email = email;
    this.password = password;
  }
}