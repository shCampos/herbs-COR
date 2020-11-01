import React from 'react'
import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography } from '@material-ui/core'
import { Add, Search } from '@material-ui/icons'

import { styleObject } from '../../assets/styleObject.js'

export default function About() {
  const classes = styleObject()

  return(
    <Box style={{maxHeight: 500}}>
      <List className={classes.list}>
        <ListItem dense className={classes.listItem}>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography variant="h6" color="primary">O que é?</Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography component="span" variant="subtitle1">
                  O <strong style={{fontFamily: 'David Libre'}}>Farinaccio</strong> é um sistema para gerenciamento e pesquisa de descrições de espécies que estão sendo estudadas por
                  projetos de pesquisa do <a className={classes.link} href="https://cpan.ufms.br/ciencias-biologicas/herbario-cor/" target="_blank">Herbário COR</a>.
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider/>
        <ListItem dense className={classes.listItem}>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography variant="h6" color="primary">Pra que serve?</Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <List style={{paddingTop: 0}}>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} color="primary">1</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Para manter as descrições das espécies que você encontrou em artigos organizadas em um lugar.
                      Você poderá procurar facilmente elas aqui."/>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} color="primary">2</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Para pesquisar a descrição de uma determinada espécie, poupando assim tempo na procura de artigos."/>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} color="primary">3</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Para pesquisar o nome de uma espécie coletada. Para isso, você precisará descrever a sua espécie."/>
                  </ListItem>
                </List>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider/>
        <ListItem dense className={classes.listItem}>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography variant="h6" color="primary" style={{marginBottom: 0}}>Como funciona?</Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <List style={{paddingTop: 0}}>
                  <ListItem className={classes.listItem}>
                    <ListItemIcon>
                      <Search color="primary"/>
                    </ListItemIcon>
                    <ListItemText primary={
                      <Typography variant="subtitle1">
                        Você pode pesquisar uma espécie pelo seu nome científico ou pela sua descrição.
                        Caso pesquise pela descrição, o sistema retornará as 10 espécies mais prováveis.
                      </Typography>
                    }/>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <ListItemIcon>
                      <Add color="primary"/>
                    </ListItemIcon>
                    <ListItemText primary={
                      <Typography variant="subtitle1">
                        Você pode adicionar descrições de espécie para contribuir para o aumento do banco de dados.
                        <strong> ATENÇÃO: Esse serviço só está disponível para os usuários. Para ser um usuário, solicite seu cadastro (em breve).</strong>
                      </Typography>
                    }/>
                  </ListItem>
                </List>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider/>
        <ListItem className={classes.listItem}>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography variant="h6" color="primary">Fale conosco!</Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography component="span" variant="subtitle1">
                  Se você tem ideias, reclamações, algo não funciona, o site ta feio demais, mande um e-mail para
                  <a className={classes.link} href="mailto:samuel-hc@hotmail.com"> samuel-hc@hotmail.com</a>.
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Box>
  )
}