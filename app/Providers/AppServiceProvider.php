<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Registra servicios de la aplicación.
     */
    public function register(): void
    {
        // Aquí puedes registrar bindings o servicios personalizados
    }

    /**
     * Ejecuta tareas después de que todos los servicios han sido registrados.
     */
    public function boot(): void
    {
        // Puedes ejecutar lógica como extender funcionalidades o configurar cosas globales
    }
}

?>

