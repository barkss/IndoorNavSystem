package com.mark.indoornav

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthUserCollisionException
import com.google.firebase.database.FirebaseDatabase
import com.mark.indoornav.databinding.ActivityRegisterBinding

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private lateinit var auth: FirebaseAuth
    private val database = FirebaseDatabase.getInstance().reference

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()

        binding.registerBtn.setOnClickListener {
            val email = binding.emailInput.text.toString().trim()
            val password = binding.passwordInput.text.toString().trim()
            val confirmPassword = binding.confirmPassword.text.toString().trim()
            val username = binding.usernameInput.text.toString().trim()

            // Validate inputs
            if (email.isEmpty() || password.isEmpty() || username.isEmpty()) {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (password != confirmPassword) {
                Toast.makeText(this, "Passwords don't match", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (password.length < 6) {
                Toast.makeText(this, "Password needs 6+ characters", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // Create user with email/password
            auth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener { task ->
                    if (task.isSuccessful) {
                        // Save additional user data
                        val user = hashMapOf(
                            "email" to email,
                            "username" to username,
                            "createdAt" to System.currentTimeMillis()
                        )

                        database.child("users").child(auth.currentUser?.uid ?: "").setValue(user)
                            .addOnSuccessListener {
                                // Clear form
                                binding.emailInput.text?.clear()
                                binding.passwordInput.text?.clear()
                                binding.confirmPassword.text?.clear()
                                binding.usernameInput.text?.clear()

                                // Redirect to login with clear back stack
                                startActivity(
                                    Intent(this, MainActivity::class.java).apply {
                                        flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or
                                                Intent.FLAG_ACTIVITY_NEW_TASK
                                    }
                                )
                                finish()
                            }
                            .addOnFailureListener { e ->
                                Toast.makeText(
                                    this,
                                    "Failed to save user data: ${e.message}",
                                    Toast.LENGTH_LONG
                                ).show()
                            }
                    } else {
                        // Handle specific error cases
                        val errorMessage = when (task.exception) {
                            is FirebaseAuthUserCollisionException ->
                                "Email already registered. Please login instead."
                            else -> "Registration failed: ${task.exception?.message}"
                        }
                        Toast.makeText(this, errorMessage, Toast.LENGTH_LONG).show()

                        // Optionally redirect to login if email exists
                        if (task.exception is FirebaseAuthUserCollisionException) {
                            startActivity(Intent(this, MainActivity::class.java))
                        }
                    }
                }
        }

        binding.loginRedirectText.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }
    }
}