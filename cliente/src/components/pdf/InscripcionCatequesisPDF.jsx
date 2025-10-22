import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

// 📌 Usa tu logo importado (asegúrate de la ruta correcta)
import LOGO_BASE64 from '../../image/logoParroquia.png';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 5,
    textDecoration: 'underline',
  },
  text: {
    fontSize: 10,
    marginBottom: 4,
  },
  lineField: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  underline: {
    textDecoration: 'underline',
    minWidth: 60,
  },
  commitmentItem: {
    fontSize: 10,
    marginBottom: 4,
    textAlign: 'justify',
  },
  signatureBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 10,
  },
  signatureLine: {
    width: '45%',
    textAlign: 'center',
    borderTop: '1pt solid #000',
    paddingTop: 3,
    fontSize: 9,
  },
  requisitosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  requisitoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '0.5pt dotted #999',
    paddingVertical: 2,
  },
  requisitoText: {
    width: '70%',
  },
  requisitoCheck: {
    width: '30%',
    textAlign: 'right',
  },
});

const InscripcionCatequesisPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* ENCABEZADO */}
      <View style={styles.header}>
        <Image src={LOGO_BASE64} style={styles.logo} />
        <Text>Parroquia Divino Maestro Sede UNET</Text>
        <Text style={styles.title}>PLANILLA DE INSCRIPCIÓN</Text>
        <Text style={styles.subtitle}>Catequesis - Nivel 1 y 2</Text>
        <Text style={styles.subtitle}>Sacramento de la Primera Confesión / Primera Comunión</Text>
      </View>

      {/* DATOS DEL CATEQUIZANDO */}
      <Text style={styles.sectionTitle}>DATOS DEL CATEQUIZANDO:</Text>

      <View style={styles.lineField}>
        <Text style={styles.label}>Nombres:</Text>
        <Text style={styles.underline}>__________________________________</Text>
        <Text style={[styles.label, { marginLeft: 10 }]}>Apellidos:</Text>
        <Text style={styles.underline}>__________________________________</Text>
      </View>

      <View style={styles.lineField}>
        <Text style={styles.label}>Lugar y fecha de nacimiento:</Text>
        <Text style={styles.underline}>__________________________________________</Text>
        <Text style={[styles.label, { marginLeft: 10 }]}>Edad:</Text>
        <Text style={styles.underline}>________</Text>
      </View>

      <View style={styles.lineField}>
        <Text style={styles.label}>Lugar y fecha del Bautizo:</Text>
        <Text style={styles.underline}>_____________________________________________</Text>
      </View>

      <View style={styles.lineField}>
        <Text style={styles.label}>Dirección de habitación:</Text>
        <Text style={styles.underline}>_____________________________________________</Text>
      </View>

      <View style={styles.lineField}>
        <Text style={styles.label}>Institución educativa donde cursa estudios:</Text>
        <Text style={styles.underline}>____________________________________</Text>
      </View>

      <View style={styles.lineField}>
        <Text style={styles.label}>Grado:</Text>
        <Text style={styles.underline}>________</Text>
        <Text style={[styles.label, { marginLeft: 10 }]}>Turno:</Text>
        <Text>Mañana (  )   Tarde (  )</Text>
      </View>

      <View style={styles.lineField}>
        <Text style={styles.label}>Número de teléfono de la institución educativa:</Text>
        <Text style={styles.underline}>______________________</Text>
      </View>

      {/* DATOS DE LOS PADRES */}
      <Text style={styles.sectionTitle}>DATOS DE LOS PADRES:</Text>

      <View style={styles.lineField}>
        <Text style={styles.label}>Madre:</Text>
        <Text style={styles.underline}>________________________</Text>
        <Text style={[styles.label, { marginLeft: 10 }]}>Cédula de identidad:</Text>
        <Text style={styles.underline}>______________________</Text>
      </View>

      <View style={styles.lineField}>
        <Text style={styles.label}>N° de teléfono:</Text>
        <Text style={styles.underline}>_________________</Text>
        <Text style={[styles.label, { marginLeft: 10 }]}>Ocupación:</Text>
        <Text style={styles.underline}>__________________________</Text>
      </View>

      <View style={styles.lineField}>
        <Text style={styles.label}>Padre:</Text>
        <Text style={styles.underline}>________________________</Text>
        <Text style={[styles.label, { marginLeft: 10 }]}>Cédula de identidad:</Text>
        <Text style={styles.underline}>______________________</Text>
      </View>

      <View style={styles.lineField}>
        <Text style={styles.label}>N° de teléfono:</Text>
        <Text style={styles.underline}>_________________</Text>
        <Text style={[styles.label, { marginLeft: 10 }]}>Ocupación:</Text>
        <Text style={styles.underline}>__________________________</Text>
      </View>

      <View style={styles.lineField}>
        <Text style={styles.label}>Madre y padre casados por:</Text>
        <Text>Civil (  )   Iglesia (  )   Pareja de hecho (  )</Text>
        <Text style={[styles.label, { marginLeft: 10 }]}>Viven juntos:</Text>
        <Text>Sí (  )   No (  )</Text>
      </View>

      <View style={styles.lineField}>
        <Text style={styles.label}>Número de hermanos:</Text>
        <Text style={styles.underline}>__________</Text>
        <Text style={[styles.label, { marginLeft: 10 }]}>Edades:</Text>
        <Text style={styles.underline}>________________</Text>
      </View>

      {/* DATOS DEL REPRESENTANTE */}
      <Text style={styles.sectionTitle}>DATOS DEL REPRESENTANTE:</Text>

      <View style={styles.lineField}>
        <Text style={styles.label}>Nombres y apellidos:</Text>
        <Text style={styles.underline}>__________________________________</Text>
        <Text style={[styles.label, { marginLeft: 10 }]}>Cédula de identidad:</Text>
        <Text style={styles.underline}>______________</Text>
        <Text style={[styles.label, { marginLeft: 10 }]}>N° de teléfono:</Text>
        <Text style={styles.underline}>__________________</Text>
      </View>

      {/* COMPROMISOS */}
      <Text style={styles.sectionTitle}>Como Representante me comprometo a:</Text>
      <Text style={styles.commitmentItem}>• Llevar a mi representado(a) todos los domingos (asistencia continua) a la Catequesis, y a aquellas actividades programadas por la Parroquia Divino Maestro.</Text>
      <Text style={styles.commitmentItem}>• Velar por los compromisos a ser elaborados por mi Representado(a) en el hogar.</Text>
      <Text style={styles.commitmentItem}>• Asistir con mi representado(a) a la Santa Misa todos los domingos.</Text>
      <Text style={styles.commitmentItem}>• Acudir a las reuniones convocadas por el servicio de la Catequesis.</Text>
      <Text style={styles.commitmentItem}>• Colaborar con la organización, realización y celebración de las actividades parroquiales a las cuales sea invitado.</Text>
      <Text style={styles.commitmentItem}>• Permanecer con su Representado(a) durante la Santa Misa y posteriormente retirarse de las instalaciones de la UNET.</Text>

      {/* FIRMAS */}
      <View style={styles.signatureBlock}>
        <Text style={styles.signatureLine}>Firma del Representante del Catequizando</Text>
        <Text style={styles.signatureLine}>Firma de la Catequista</Text>
      </View>

      {/* REQUISITOS */}
      <View style={styles.requisitosHeader}>
        <Text>Requisitos:</Text>
        <Text>Entregado:</Text>
      </View>

      <View>
        <View style={styles.requisitoRow}>
          <Text style={styles.requisitoText}>1 fotocopia de la cédula o partida de nacimiento del niño(a)</Text>
          <Text style={styles.requisitoCheck}>Sí (  ) No (  )</Text>
        </View>
        <View style={styles.requisitoRow}>
          <Text style={styles.requisitoText}>1 fotografía tipo carnet del Catequizando</Text>
          <Text style={styles.requisitoCheck}>Sí (  ) No (  )</Text>
        </View>
        <View style={styles.requisitoRow}>
          <Text style={styles.requisitoText}>1 fotocopia de la cédula del Representante</Text>
          <Text style={styles.requisitoCheck}>Sí (  ) No (  )</Text>
        </View>
        <View style={styles.requisitoRow}>
          <Text style={styles.requisitoText}>Cuota de colaboración voluntaria</Text>
          <Text style={styles.requisitoCheck}>Sí (  ) No (  )</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default InscripcionCatequesisPDF;
