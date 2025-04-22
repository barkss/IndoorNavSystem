package com.example.indoornavi


import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException

class SignUpActivity : AppCompatActivity() {

    private lateinit var editTextSignupEmail: EditText
    private lateinit var editTextSignupPassword: EditText
    private lateinit var buttonSignUp: Button
    private lateinit var textViewLoginRedirect: TextView
    private lateinit var signInButtonGoogle: com.google.android.gms.common.SignInButton
    private lateinit var googleSignInClient: GoogleSignInClient

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_up)

        editTextSignupEmail = findViewById(R.id.editTextSignupEmail)
        editTextSignupPassword = findViewById(R.id.editTextSignupPassword)
        buttonSignUp = findViewById(R.id.buttonSignUp)
        textViewLoginRedirect = findViewById(R.id.textViewLoginRedirect)
        signInButtonGoogle = findViewById(R.id.signInButtonGoogle)

        // Configure Google Sign In
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken("YOUR_WEB_CLIENT_ID") // Replace with your Web client ID
            .requestEmail()
            .build()

        googleSignInClient = GoogleSignIn.getClient(this, gso)

        textViewLoginRedirect.setOnClickListener {
            startActivity(Intent(this, SignInActivity::class.java))
            finish()
        }

        buttonSignUp.setOnClickListener {
            val email = editTextSignupEmail.text.toString().trim()
            val password = editTextSignupPassword.text.toString().trim()

            if (email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please enter email and password", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // TODO: Implement your email/password signup logic here
            Toast.makeText(this, "Attempting to sign up with: $email", Toast.LENGTH_SHORT).show()
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }

        signInButtonGoogle.setOnClickListener {
            signInWithGoogle()
        }
    }

    private fun signInWithGoogle() {
        val signInIntent = googleSignInClient.signInIntent
        startActivityForResult(signInIntent, RC_SIGN_IN)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == RC_SIGN_IN) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)
            try {
                val account = task.getResult(ApiException::class.java)
                // Google Sign In was successful, authenticate with Firebase or your backend.
                Log.d("Google Sign Up", "Google sign up successful, ID token: ${account?.idToken}")
                // TODO: Send Google ID token to your backend for verification and account creation.
                startActivity(Intent(this, MainActivity::class.java))
                finish()
            } catch (e: ApiException) {
                // Google Sign In failed, update UI appropriately
                Log.w("Google Sign Up", "Google sign up failed", e)
                Toast.makeText(this, "Google sign up failed: ${e.message}", Toast.LENGTH_SHORT).show()
            }
        }
    }
}