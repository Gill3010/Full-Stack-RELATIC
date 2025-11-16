import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function TabTwoScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 24 }}>
      <ThemedText type="title">Explora</ThemedText>
      <ThemedText style={{ marginTop: 8 }}>
        Esta pestaña está lista para que definas el contenido de “Explore” según las necesidades
        reales del proyecto.
      </ThemedText>
    </ThemedView>
  );
}
