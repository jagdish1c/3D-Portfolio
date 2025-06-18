# Adding Your Car Model

To add your Blender car model to this project:

1. Export your car model from Blender as a `.glb` file
2. Name the file `car.glb`
3. Place the file in this `public` directory
4. The application will automatically load the model

## Tips for Exporting from Blender

1. Make sure your model is properly scaled and centered
2. Use the Blender GLB exporter with these settings:
   - Format: glTF 2.0 (.glb/.gltf)
   - Include: Selected Objects
   - Transform: +Y Up
   - Check "Apply Modifiers"
   - Check "Export Textures"

3. Keep the file size reasonable (under 5MB if possible) for better performance

Once your model is placed in this directory, the Car component will automatically use it instead of the placeholder box.