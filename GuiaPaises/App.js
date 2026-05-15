
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';

export default function App() {
  const [paisDigitado, setPaisDigitado] = useState('');
  const [pais, setPais] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const [locaisTuristicos, setLocaisTuristicos] = useState([]);
  const [fotosTurismo, setFotosTurismo] = useState([]);
  const [clima, setClima] = useState(null);
  const [moedaReal, setMoedaReal] = useState(null);
  const [curiosidade, setCuriosidade] = useState('');

  // TURISMO + CURIOSIDADES
  async function buscarLocaisTuristicos(nomePais) {
    try {
      // TURISMO
      const respostaTurismo = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/Tourism_in_${nomePais}`
      );

      let turismoTexto = '';

      if (respostaTurismo.ok) {
        const turismoDados =
          await respostaTurismo.json();

        turismoTexto =
          turismoDados.extract || '';
      }

      // CURIOSIDADE
      const respostaCuriosidade =
        await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${nomePais}`
        );

      let curiosidadeTexto =
        'Curiosidade não encontrada.';

      if (respostaCuriosidade.ok) {
        const curiosidadeDados =
          await respostaCuriosidade.json();

        curiosidadeTexto =
          curiosidadeDados.extract;
      }

      // FRASES TURISMO
      const frasesTurismo =
        turismoTexto
          .split('.')
          .filter(
            (frase) =>
              frase.trim().length > 20
          )
          .slice(0, 5);

      setLocaisTuristicos(
        frasesTurismo
      );

      setCuriosidade(
        curiosidadeTexto
      );

      // 4 FOTOS
      setFotosTurismo([
        `https://picsum.photos/600/400?random=${Math.random()}`,
        `https://picsum.photos/600/400?random=${Math.random()}`,
        `https://picsum.photos/600/400?random=${Math.random()}`,
        `https://picsum.photos/600/400?random=${Math.random()}`,
      ]);

    } catch (erro) {
      console.log(
        'Erro turismo:',
        erro
      );

      setLocaisTuristicos([]);

      setCuriosidade(
        'Não foi possível carregar curiosidades.'
      );
    }
  }

  // CLIMA
  async function buscarClima(capital) {
    try {
      const resposta = await fetch(
        `https://wttr.in/${capital}?format=j1`
      );

      const dados =
        await resposta.json();

      setClima({
        temperatura:
          dados.current_condition[0]
            .temp_C,

        descricao:
          dados.current_condition[0]
            .weatherDesc[0].value,

        umidade:
          dados.current_condition[0]
            .humidity,
      });

    } catch (erro) {
      console.log(erro);
      setClima(null);
    }
  }

  // CONVERTER MOEDA
  async function converterMoeda(
    codigoMoeda
  ) {
    try {
      if (
        !codigoMoeda ||
        codigoMoeda === 'BRL'
      ) {
        setMoedaReal(
          '1 Real Brasileiro'
        );

        return;
      }

      const resposta = await fetch(
        `https://open.er-api.com/v6/latest/${codigoMoeda}`
      );

      const dados =
        await resposta.json();

      const valorBRL =
        dados.rates.BRL;

      setMoedaReal(
        `1 ${codigoMoeda} = ${valorBRL.toFixed(
          2
        )} BRL`
      );

    } catch (erro) {
      console.log(erro);

      setMoedaReal(null);
    }
  }

  // BUSCAR PAÍS
  async function buscarPais() {
    if (
      paisDigitado.trim() === ''
    ) {
      setErro(
        'Digite o nome de um país.'
      );

      return;
    }

    try {
      setCarregando(true);

      setErro('');

      setPais(null);

      const resposta = await fetch(
        `https://restcountries.com/v3.1/name/${paisDigitado}`
      );

      if (!resposta.ok) {
        throw new Error(
          'País não encontrado'
        );
      }

      const dados =
        await resposta.json();

      const paisEncontrado =
        dados[0];

      setPais(paisEncontrado);

      await buscarLocaisTuristicos(
        paisEncontrado.name.common.replaceAll(
          ' ',
          '_'
        )
      );

      if (
        paisEncontrado.capital
      ) {
        await buscarClima(
          paisEncontrado
            .capital[0]
        );
      }

      if (
        paisEncontrado.currencies
      ) {
        const codigoMoeda =
          Object.keys(
            paisEncontrado.currencies
          )[0];

        await converterMoeda(
          codigoMoeda
        );
      }

    } catch (erro) {
      console.log(erro);

      setErro(
        'Erro ao buscar país.'
      );
    } finally {
      setCarregando(false);
    }
  }

  // PAÍS ALEATÓRIO
  async function buscarPaisRandom() {
    try {
      setCarregando(true);

      setErro('');

      const resposta = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,capital,region,population,languages,currencies,maps'
      );

      const paises =
        await resposta.json();

      const indiceRandom =
        Math.floor(
          Math.random() *
            paises.length
        );

      const paisSorteado =
        paises[indiceRandom];

      setPais(paisSorteado);

      await buscarLocaisTuristicos(
        paisSorteado.name.common.replaceAll(
          ' ',
          '_'
        )
      );

      if (
        paisSorteado.capital
      ) {
        await buscarClima(
          paisSorteado
            .capital[0]
        );
      }

      if (
        paisSorteado.currencies
      ) {
        const codigoMoeda =
          Object.keys(
            paisSorteado.currencies
          )[0];

        await converterMoeda(
          codigoMoeda
        );
      }

    } catch (erro) {
      console.log(erro);

      setErro(
        'Erro ao buscar país aleatório'
      );
    } finally {
      setCarregando(false);
    }
  }

  function formatarNumero(
    numero
  ) {
    return Number(
      numero
    ).toLocaleString(
      'pt-BR'
    );
  }

  function obterIdiomas() {
    if (
      !pais ||
      !pais.languages
    ) {
      return 'Não informado';
    }

    return Object.values(
      pais.languages
    ).join(', ');
  }

  function obterMoedas() {
    if (
      !pais ||
      !pais.currencies
    ) {
      return 'Não informado';
    }

    return Object.values(
      pais.currencies
    )
      .map(
        (moeda) =>
          `${moeda.name} (${moeda.symbol || 'sem símbolo'})`
      )
      .join(', ');
  }

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <Text style={styles.titulo}>
        Guia de Países
      </Text>

      <Text style={styles.subtitulo}>
        Explore países, clima,
        turismo e curiosidades
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite em inglês. Ex: brazil"
        value={paisDigitado}
        onChangeText={
          setPaisDigitado
        }
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={buscarPais}
      >
        <Text
          style={
            styles.textoBotao
          }
        >
          Buscar País
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={
          buscarPaisRandom
        }
      >
        <Text
          style={
            styles.textoBotao
          }
        >
          País Aleatório
        </Text>
      </TouchableOpacity>

      {carregando && (
        <ActivityIndicator
          size="large"
          color="#2563EB"
          style={styles.loading}
        />
      )}

      {erro !== '' && (
        <Text style={styles.erro}>
          {erro}
        </Text>
      )}

      {pais && (
        <View style={styles.card}>
          <Text
            style={
              styles.nomePais
            }
          >
            {pais.name?.common}
          </Text>

          <Text style={styles.info}>
            Capital:{' '}
            {pais.capital
              ? pais.capital[0]
              : 'Não informado'}
          </Text>

          <Text style={styles.info}>
            Região:{' '}
            {pais.region}
          </Text>

          <Text style={styles.info}>
            População:{' '}
            {formatarNumero(
              pais.population
            )}
          </Text>

          <Text style={styles.info}>
            Idiomas:{' '}
            {obterIdiomas()}
          </Text>

          <Text style={styles.info}>
            Moedas:{' '}
            {obterMoedas()}
          </Text>

          {/* CLIMA */}
          {clima && (
            <View
              style={styles.box}
            >
              <Text
                style={
                  styles.tituloBox
                }
              >
                Clima Atual
              </Text>

              <Text
                style={
                  styles.info
                }
              >
                Temperatura:{' '}
                {
                  clima.temperatura
                }
                °C
              </Text>

              <Text
                style={
                  styles.info
                }
              >
                Clima:{' '}
                {clima.descricao}
              </Text>

              <Text
                style={
                  styles.info
                }
              >
                Umidade:{' '}
                {clima.umidade}%
              </Text>
            </View>
          )}

          {/* MOEDA */}
          {moedaReal && (
            <View
              style={styles.box}
            >
              <Text
                style={
                  styles.tituloBox
                }
              >
                Conversão para
                Real
              </Text>

              <Text
                style={
                  styles.info
                }
              >
                {moedaReal}
              </Text>
            </View>
          )}

          {/* CURIOSIDADE */}
          <View
            style={styles.box}
          >
            <Text
              style={
                styles.tituloBox
              }
            >
              Curiosidade
            </Text>

            <Text
              style={
                styles.info
              }
            >
              {curiosidade}
            </Text>
          </View>

          {/* TURISMO CARDS */}
<View style={styles.box}>
  <Text style={styles.tituloBox}>
    Lugares Turísticos
  </Text>

  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
  >
    {fotosTurismo.map((foto, index) => (
      <View
        key={index}
        style={styles.cardTurismo}
      >
        <Image
          source={{ uri: foto }}
          style={styles.imagemTurismo}
        />

        <View style={styles.infoTurismo}>
          <Text style={styles.nomeTurismo}>
            {locaisTuristicos[index]
              ? locaisTuristicos[index]
              : 'Ponto Turístico'}
          </Text>

          <Text style={styles.avaliacao}>
            ⭐ 4.8 (120 mil)
          </Text>

          <Text style={styles.descricaoTurismo}>
            Lugar turístico famoso
          </Text>

          <Text style={styles.preco}>
            Grátis
          </Text>
          </View>
          </View>
          ))}
          </ScrollView>
        </View>

          {pais.maps
            ?.googleMaps && (
            <TouchableOpacity
              style={
                styles.botaoMapa
              }
              onPress={() =>
                Linking.openURL(
                  pais.maps
                    .googleMaps
                )
              }
            >
              <Text
                style={
                  styles.textoBotaoMapa
                }
              >
                Abrir no
                Google Maps
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor:
        '#F3F4F6',
      padding: 20,
      paddingTop: 60,
      alignItems: 'center',
    },

    titulo: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#1E3A8A',
      marginBottom: 5,
    },

    subtitulo: {
      fontSize: 16,
      color: '#475569',
      marginBottom: 25,
      textAlign: 'center',
    },

    input: {
      width: '100%',
      backgroundColor:
        '#FFFFFF',
      borderWidth: 1,
      borderColor:
        '#CBD5E1',
      borderRadius: 12,
      padding: 14,
      fontSize: 16,
      marginBottom: 12,
    },

    botao: {
      width: '100%',
      backgroundColor:
        '#2563EB',
      padding: 15,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 12,
    },

    textoBotao: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },

    loading: {
      marginTop: 25,
    },

    erro: {
      color: '#DC2626',
      marginTop: 20,
      fontSize: 15,
      textAlign: 'center',
    },

    card: {
      width: '100%',
      backgroundColor:
        '#FFFFFF',
      borderRadius: 18,
      padding: 20,
      marginTop: 25,
    },

    nomePais: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#0F172A',
      marginBottom: 15,
      textAlign: 'center',
    },

    info: {
      fontSize: 16,
      color: '#334155',
      marginBottom: 8,
    },

    box: {
      width: '100%',
      marginTop: 20,
      backgroundColor:
        '#EFF6FF',
      padding: 15,
      borderRadius: 12,
    },

    tituloBox: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#1E3A8A',
    },

    gridFotos: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent:
        'space-between',
    },

    fotoTurismo: {
      width: '48%',
      height: 140,
      borderRadius: 12,
      marginBottom: 12,
    },

    botaoMapa: {
      marginTop: 20,
      backgroundColor:
        '#16A34A',
      padding: 13,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
    },

    textoBotaoMapa: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: 'bold',
    },

    cardTurismo: {
  width: 220,
  backgroundColor: '#FFFFFF',
  borderRadius: 20,
  marginRight: 15,
  overflow: 'hidden',
  elevation: 5,
},

imagemTurismo: {
  width: '100%',
  height: 150,
},

infoTurismo: {
  padding: 12,
},

nomeTurismo: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#0F172A',
  marginBottom: 8,
},

avaliacao: {
  fontSize: 14,
  color: '#475569',
  marginBottom: 5,
},

descricaoTurismo: {
  fontSize: 14,
  color: '#64748B',
  marginBottom: 8,
},

preco: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#16A34A',
},
  });

