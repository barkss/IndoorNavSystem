package com.mark.indoornav

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var usernameInput: EditText
    private lateinit var passwordInput: EditText
    private lateinit var loginBtn: Button
    private lateinit var goToRegister: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        // Log that MainActivity has started
        Log.d("IndoorNav", "MainActivity onCreate called")

        // Initialize views
        usernameInput = findViewById(R.id.username_input)
        passwordInput = findViewById(R.id.password_input)
        loginBtn = findViewById(R.id.login_btn)
        goToRegister = findViewById(R.id.go_to_register)

        // Set up login button click listener
        loginBtn.setOnClickListener {
            Log.d("IndoorNav", "Login button clicked")

            val username = usernameInput.text.toString()
            val password = passwordInput.text.toString()

            // Simple validation
            if (username.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please enter both username and password", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // Check credentials - Accept any login for testing
            if (true) { // Changed from (username == "admin" && password == "1234") for testing
                // Log successful login
                Log.d("IndoorNav", "Login successful - attempting to start HomeActivity")

                // Show toast
                Toast.makeText(this, "Login Successful", Toast.LENGTH_SHORT).show()

                try {
                    // Use a simple and direct approach
                    val intent = Intent(this@MainActivity, Class.forName("com.mark.indoornav.HomeActivity"))
                    startActivity(intent)

                    Log.d("IndoorNav", "HomeActivity intent started successfully")
                } catch (e: Exception) {
                    // Log any errors that occur during the process
                    Log.e("IndoorNav", "Error starting HomeActivity: ${e.message}")
                    e.printStackTrace()
                    Toast.makeText(this, "Error: ${e.message}", Toast.LENGTH_LONG).show()
                }
            } else {
                // Log failed login attempt
                Log.d("IndoorNav", "Login failed - Invalid credentials")

                // Show error message
                Toast.makeText(this, "Invalid Credentials", Toast.LENGTH_SHORT).show()
            }
        }

        // Set up register text click listener
        goToRegister.setOnClickListener {
            try {
                val intent = Intent(this, RegisterActivity::class.java)
                startActivity(intent)
                Log.d("IndoorNav", "RegisterActivity started successfully")
            } catch (e: Exception) {
                Log.e("IndoorNav", "Error starting RegisterActivity: ${e.message}")
                e.printStackTrace()
            }
        }
    }
}