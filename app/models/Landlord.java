package models;
import javax.persistence.Entity;

import play.db.jpa.Model;

@Entity
public class Landlord extends Model
{
  public String firstName;
  public String lastName;
  public String email;
  public String password;
  public String line1Address;
  public String line2Address;
  public String city;
  public String country;

  public Landlord(String firstName, String lastName, String email, 
      String password,String line1Address,String line2Address,String city, String country)
  {
    this.firstName = firstName;
    this.lastName  = lastName;
    this.email     = email;
    this.password  = password;
    this.line1Address = line1Address;
    this.line2Address = line2Address;
    this.city = city;
    this.country = country;
  }
  
  public static Landlord findByEmail(String email)
  {
    return find("email", email).first();
  }

  public boolean checkPassword(String password)
  {
    return this.password.equals(password);
  }
}