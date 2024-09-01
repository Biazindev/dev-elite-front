import React, { useState, useEffect, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { PiMagnifyingGlassThin } from 'react-icons/pi'
import { IoMdMenu } from 'react-icons/io'

import api from '../services/api'

import * as S from './styles'

const Header: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('')
    const [hasError, setHasError] = useState<boolean>(false)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    const { error } = api.useSearchMoviesQuery(debouncedSearchTerm, {
        skip: debouncedSearchTerm.trim() === '',
    })

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 300)
        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm])

    const handleSearchSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchTerm.trim()) {
            navigate(`/results?query=${encodeURIComponent(searchTerm.trim())}`)
            setSearchTerm('')
        }
    }

    useEffect(() => {
        if (error) {
            setHasError(true)
        }
    }, [error])

    useEffect(() => {
        if (hasError) {
            alert('Ocorreu um erro ao buscar filmes. Você será redirecionado para a página inicial.')
            setHasError(false)
            navigate('/')
        }
    }, [hasError, navigate])

    const handleMenuClick = (path: string) => {
        navigate(path)
        setIsMenuOpen(false)
    }

    return (
        <S.Container>
            <S.MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <IoMdMenu size={40} />
            </S.MenuButton>
            {isMenuOpen && (
                <S.Menu>
                    <S.MenuItem onClick={() => handleMenuClick('/')}>Home</S.MenuItem>
                    <S.MenuItem onClick={() => handleMenuClick('/genres')}>Gêneros</S.MenuItem>
                    <S.MenuItem onClick={() => handleMenuClick('/favorites')}>Favoritos</S.MenuItem>
                </S.Menu>
            )}
            <div>
                <S.IconBar>
                    <PiMagnifyingGlassThin />
                </S.IconBar>
                <input
                    placeholder="Busque por filmes, séries, tv e mais..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                />
            </div>
        </S.Container>
    )
}

export default Header
