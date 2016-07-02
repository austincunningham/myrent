package models;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

import play.db.jpa.Model;

@Entity
public class Tenant extends Model
{
  public String firstName;
  public String lastName;
  public String email;
  public String password;
  
  //@OneToOne
  public Residence residence;
  
  
  public Tenant(String firstName, String lastName, String email,String password, Residence residence)
  {
    this.firstName = firstName;
    this.lastName  = lastName;
    this.email     = email;
    this.password  = password;
    this.residence = residence;
  }
  
  public static Tenant findByEmail(String email)
  {
    return find("email", email).first();
  }

  public boolean checkPassword(String password)
  {
    return this.password.equals(password);
  }
}