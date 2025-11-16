import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * Pantalla de registro
 * Placeholder para la funcionalidad de registro
 */
export default function RegisterScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Regístrate</ThemedText>
      <ThemedText style={{ marginTop: 16, textAlign: 'center' }}>
        Esta es la pantalla de registro. Aquí se implementará el formulario de registro.
      </ThemedText>
    </ThemedView>
  );
}

