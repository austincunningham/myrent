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
  public static Administrator findByEmail(String email)
  {
    return find("email", email).first();
  }

  public boolean checkPassword(String password)
  {
    return this.password.equals(password);
  }
  
}