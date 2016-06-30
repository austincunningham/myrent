package models;
import javax.persistence.Entity;

import play.db.jpa.Model;

@Entity
public class Tenant extends Model
{
  public String firstName;
  public String lastName;
  public String email;
  public String password;
  public String tenantReference;
  
  public Tenant(String firstName, String lastName, String email,String password, String tenantReference)
  {
    this.firstName = firstName;
    this.lastName  = lastName;
    this.email     = email;
    this.password  = password;
    this.tenantReference = tenantReference;
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