package com.mark.indoornav

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class HomeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // First, log that we're attempting to create the activity
        Log.d("IndoorNav", "HomeActivity onCreate - About to set content view")

        try {
            // Set the content view - this is the critical step
            setContentView(R.layout.activity_home)

            // Log success
            Log.d("IndoorNav", "HomeActivity onCreate - Content view set successfully")

            // Show a toast to confirm we're in the HomeActivity
            Toast.makeText(this, "Welcome to Home Screen", Toast.LENGTH_SHORT).show()

        } catch (e: Exception) {
            // Log any errors that occur when setting the content view
            Log.e("IndoorNav", "Error in HomeActivity: ${e.message}")
            e.printStackTrace()

            // Show an error toast
            Toast.makeText(this, "Error loading home screen: ${e.message}", Toast.LENGTH_LONG).show()
        }
    }
}