package mysql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;
import java.util.Random;

public class Logger {
    
    public static Connection conn;
    public static final int Interval = 60;
    
    public static void main(String[] args) {
        new Logger();
    }
    
    public Logger() {
        
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost/phat-logger?user=phat_user&password=phat_user");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        Random r = new Random();
        
        System.out.println("Start Logging...");
        
        long currentTime = System.currentTimeMillis();
        
        while (true) {
            if (currentTime + (Interval * 1000) < System.currentTimeMillis()) {
                float value = r.nextFloat();
                System.out.println("Logging value: " + value + " @ " + new Date());
                Log(value);
                currentTime = System.currentTimeMillis();
            }
        }
        
        //Output();
        
    }
    
    public static void Output() {
         
        try {
            Statement statement = conn.createStatement();
            statement.executeQuery("select * from log");
            
            try (ResultSet rs = statement.getResultSet()) {
                while (rs.next()) {
                    System.out.println("id: " + rs.getString(1) + "| datetime: " + rs.getString(2) + "| value: " + rs.getString(3));
                }
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
    }
    
    public static void Log(float value) {
        
        try {
            Statement statement = conn.createStatement();
            statement.execute("call log(" + value + ")");
        } catch (SQLException e) { 
            e.printStackTrace();
        }
        
    }
}