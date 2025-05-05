package com.mark.indoornav


import android.os.Bundle
import android.util.Log
import android.widget.ProgressBar
import androidx.appcompat.app.AppCompatActivity
import com.mappedin.sdk.MPIMapView
import com.mappedin.sdk.listeners.MPIMapViewListener
import com.mappedin.sdk.models.*
import com.mappedin.sdk.web.MPIOptions

class HomeActivity : AppCompatActivity(), MPIMapViewListener {
    private lateinit var mapView: MPIMapView
    private lateinit var progressBar: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
        this.title = "Render a Map"

        progressBar = findViewById(R.id.loadingIndicator)
        progressBar.bringToFront()


        mapView = findViewById<MPIMapView>(R.id.mapView)
        // See Trial API key Terms and Conditions
        // https://developer.mappedin.com/api-keys/
        mapView.loadVenue(
            MPIOptions.Init(
                "mik_OIccPYLRSZncAbYfv53bc079c",
                "mis_nQr3vsV4p3ZP7FWSdeYQPyzVEg0K6mETlfeqsih90Oj8ff71071",
                "67dcbbef213bd1000bd6bc3b",
            ),
         MPIOptions.ShowVenue(
                shadingAndOutlines = true,
                multiBufferRendering = true,
                outdoorView = MPIOptions.OutdoorView(enabled = true),
        ),
        ) { error ->
            Log.e("HomeActivity", "Error loading map view", error)
        }
        mapView.listener = this
    }

    override fun onBlueDotPositionUpdate(update: MPIBlueDotPositionUpdate) {
    }

    override fun onBlueDotStateChange(stateChange: MPIBlueDotStateChange) {
    }

    override fun onDataLoaded(data: MPIData) {
    }

    override fun onFirstMapLoaded() {
        progressBar.visibility = ProgressBar.INVISIBLE
    }

    override fun onMapChanged(map: MPIMap) {
    }

    @Deprecated("Use MPIMapClickListener instead")
    override fun onNothingClicked() {
    }

    @Deprecated("Use MPIMapClickListener instead")
    override fun onPolygonClicked(polygon: MPINavigatable.MPIPolygon) {
    }

    override fun onStateChanged(state: MPIState) {

    }
}


